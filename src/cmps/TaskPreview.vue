<template>
  <!-- @coverFull="handleCoverFull" -->
  <TaskCover
    :task="task"
    v-if="!task.cover?.isFull"
    :showEditIcon="showEditIcon"
    @mouseover="showEditIcon = true"
    @mouseleave="showEditIcon = false"
    @openQuickEdit="quickEditDisplay = true"
  />
  <section
    class="task-preview"
    :class="[
      getTaskPreviewClass(),
      {
        'with-cover':
          !task.cover?.isFull && (task.cover?.color || task.cover?.imgUrl),
      },
    ]"
    @mouseover="showEditIcon = true"
    @mouseleave="showEditIcon = false"
    @click.stop="goToTaskDetails"
    :style="getTaskPreviewStyle()"
  >
    <li v-if="task">
      <div class="labels" @click.stop v-if="!task.cover?.isFull">
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

      <div
        class="task-header"
        :class="['task-header', getTaskTextStyleClass()]"
      >
        <i
          class="icon-pencil"
          v-show="showEditIcon"
          @click.stop="openQuickEdit"
          v-if="!task.cover"
        ></i>
        <p>{{ task.title }}</p>
      </div>

      <div class="tool-tip" v-if="!task.cover?.isFull">
        <div class="tool-tip-icons">
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
              >{{ doneChecklists }}<span class="slash">/</span
              >{{ totalChecklists }}</span
            >
          </div>

          <div v-if="task.attachment && task.attachment.length > 0">
            <span class="icon attach"></span>
            <span class="attach-counter">{{ task.attachment.length }}</span>
          </div>

          <div
            class="date"
            :class="`due-date ${dueDateStatus} ${task.status}`"
            v-if="task.dueDate"
            @click.stop="toggleStatus"
          >
            <span class="icon date"></span>
            <span class="date-counter">{{ formatDate(task.dueDate) }}</span>
          </div>
        </div>

        <div class="avatar-container">
          <div class="member-avatar" v-if="task.members">
            <img
              v-for="member in task.members"
              :key="member.id"
              :src="member.imgUrl"
              class="avatar"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </li>
  </section>

  <TaskQuickEdit
    :task="task"
    :groupId="groupId"
    :quickEditDisplay="quickEditDisplay"
    :getLabel="getLabel"
    :totalChecklists="totalChecklists"
    :doneChecklists="doneChecklists"
    :dueDateStatus="dueDateStatus"
    :formatDate="formatDate"
    @close="quickEditDisplay = false"
    @status-toggled="toggleStatus"
  />
</template>

<script>
import { format } from 'date-fns'

import TaskCover from './TaskCover.vue'
import TaskQuickEdit from './TaskQuickEdit.vue'

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
  data() {
    return {
      quickEditDisplay: false,
      showEditIcon: false,
      boardMembers: null,
      fullCoverStyle: {},
    }
  },
  computed: {
    taskMembers() {
      if (!this.task.members || !this.boardMembers) return []

      return this.task.members.map((memberId) =>
        this.boardMembers.find((boardMember) => boardMember.id === memberId)
      )
    },
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
    getTaskPreviewStyle() {
      if (this.task.cover?.isFull) {
        if (this.task.cover.imgUrl) {
          return {
            backgroundImage: `url(${this.task.cover.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '260px',
          }
        } else {
          return {
            backgroundColor: this.task.cover.color,
            height: '56px',
          }
        }
      }
      return {}
    },
    getTaskTextStyleClass() {
      if (this.task.cover?.isFull) {
        if (this.task.cover.imgUrl) {
          return 'full-cover-image-task'
        } else {
          return 'full-cover-task'
        }
      }
      return ''
    },
    getTaskPreviewClass() {
      if (this.task.cover?.isFull && this.task.cover?.imgUrl) {
        return 'no-padding'
      }
      return ''
    },
    fetchBoardMembers() {
      const board = this.$store.getters.getCurrBoard
      this.boardMembers = board.members
    },
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
    openQuickEdit(e) {
      e.stopPropagation()
      this.quickEditDisplay = true

      this.quickEditTop = e.clientY + 'px'
      this.quickEditLeft = e.clientX + 'px'
    },
  },
  watch: {
    board() {
      this.fetchBoardMembers()
    },
  },
  mounted() {
    this.fetchBoardMembers()
  },
  components: {
    TaskCover,
    TaskQuickEdit,
  },
}
</script>

<style>
.labels {
  display: flex;
  flex-wrap: wrap;
}

.label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 40px;
  height: 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  vertical-align: middle;
  color: black;
  font-size: 0; /* hide the text initially */
  transition: all 0.5s; /* apply to all properties */
  font-weight: 500;
}

.label.expanded {
  width: fit-content;
  height: 16px;
  padding: 0 8px;
  font-size: 12px; /* show the text when expanded */
}

.label-text {
  opacity: 0;
  transition: opacity 0.5s, font-size 0.5s;
  text-align: left;
  margin-bottom: 0.2em;
}

.label.expanded .label-text {
  opacity: 1;
}
</style>
