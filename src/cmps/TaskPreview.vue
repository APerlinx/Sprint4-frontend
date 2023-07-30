<template>
  <TaskCover :task="task" />
  <section
    class="task-preview"
    :class="{ 'with-cover': task.cover }"
    @click="goToTaskDetails"
  >
    <li v-if="task">
      <div class="labels" @click.stop>
        <div
          v-for="labelId in task.labels"
          :key="labelId"
          class="label"
          :class="{ expanded: areLabelsVisible }"
          :style="{
            backgroundColor: (getLabel(labelId) || {}).color || 'defaultColor',
          }"
          @click.stop="toggleLabel(labelId)"
        >
          <span v-if="areLabelsVisible">{{ getLabel(labelId).title }}</span>
        </div>
      </div>

      <div class="task-header">
        <p>{{ task.title }}</p>
      </div>

      <div class="tool-tip">
        <div v-if="task.watching">
          <span class="icon watch"></span>
        </div>

        <div v-if="task.description">
          <span class="icon desc"></span>
        </div>

        <div v-if="task.comments && task.comments.length > 0">
          <span class="icon comment"></span>
          <span class="comment-counter">{{ task.comments.length }}</span>
        </div>

        <div
          v-if="task.checklists && task.checklists.length > 0"
          :class="{ 'completed-checklist': checklistCompleted }"
        >
          <span class="icon checklist"></span>
          <span class="checklist-counter"
            >{{ doneChecklists }}/{{ totalChecklists }}</span
          >
        </div>

        <div v-if="task.attachments && task.attachments.length > 0">
          <span class="icon attach"></span>
          <span class="attach-counter">{{ task.attachments.length }}</span>
        </div>

        <div
          :class="`due-date ${dueDateStatus} ${task.status}`"
          v-if="task.dueDate"
          @click.stop="toggleStatus"
        >
          <span class="icon date"></span>
          <span class="date-counter">{{ formatDate(task.dueDate) }}</span>
        </div>

        <!-- <span class="icon member">M</span> -->
      </div>
    </li>
  </section>
</template>

<script>
import { format } from 'date-fns'
import TaskCover from './TaskCover.vue'

export default {
  props: {
    groupId: {
      type: String,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    board() {
      const boardId = this.$store.getters.getCurrBoard?._id
      return boardId
    },
    totalChecklists() {
      let total = 0
      if (this.task.checklists) {
        this.task.checklists.forEach((checklist) => {
          total += checklist.todos.length
        })
      }
      return total
    },
    doneChecklists() {
      let done = 0
      if (this.task.checklists) {
        this.task.checklists.forEach((checklist) => {
          checklist.todos.forEach((todo) => {
            if (todo.isChecked) {
              done += 1
            }
          })
        })
      }
      return done
    },
    checklistCompleted() {
      return this.doneChecklists === this.totalChecklists
    },
    dueDateStatus() {
      if (!this.task.dueDate) return 'no-due-date'

      const now = Date.now()
      const dueDate = new Date(this.task.dueDate).getTime()
      const diffHours = (dueDate - now) / 1000 / 60 / 60

      if (diffHours < -48) return 'overdue-long'
      if (diffHours < 0) return 'overdue-short'
      if (diffHours < 24) return 'due-soon'
      return 'normal'
    },
    areLabelsVisible() {
      return this.$store.getters.areLabelsVisible
    },
  },
  methods: {
    goToTaskDetails() {
      this.$router.push(
        `/details/${this.board}/group/${this.groupId}/task/${this.task.id}`
      )
    },
    formatDate(timestamp) {
      return format(new Date(timestamp), 'dd MMM')
    },
    toggleStatus() {
      this.$store.dispatch('toggleStatus', {
        groupId: this.groupId,
        task: this.task,
      })
    },
    getLabel(id) {
      return this.$store.getters.getLabelById(id) || {}
    },

    toggleLabel() {
      this.$store.commit('toggleLabelsVisibility')
    },
  },
  components: {
    TaskCover,
  },
}
</script>

<style scoped>
.labels {
  display: flex;
  flex-wrap: wrap;
}
.label {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: start;
  width: 40px;
  height: 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  color: black;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}

.label.expanded {
  min-width: 56px;
  width: max-content;
  height: 16px;
  padding: 0 8px;
}

.label-text {
  opacity: 0;
  visibility: hidden;
  font-weight: 500;
  transition: opacity 2s, visibility 5s;
}

.label.expanded .label-text {
  opacity: 1;
  visibility: visible;
}
</style>
