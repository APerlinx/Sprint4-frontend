<template>
  <section class="task-preview" @click="goToTaskDetails" draggable="false">
    <li v-if="task">
      <div class="task-header">
        <p>{{ task.title }}</p>
      </div>

      <div class="tool-tip">
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

        <div :class="`due-date ${dueDateStatus}`" v-if="task.dueDate">
          <span class="icon date"></span>
          <span class="date-counter">{{ formatDate(task.dueDate) }}</span>
        </div>

        <span class="icon member">M</span>
      </div>
    </li>
  </section>

  <!-- <section class="task-preview">
      <RouterLink :to="'/details/' + this.currBoard + '/group/' + this.groupId + '/task/' + task.id">
        <li v-if="task">
          <p>{{ task.title }}</p>
        </li>
      </RouterLink> -->
</template>

<script>
import { format } from 'date-fns'

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
      this.task.checklists.forEach((checklist) => {
        total += checklist.todos.length
      })
      return total
    },
    doneChecklists() {
      let done = 0
      this.task.checklists.forEach((checklist) => {
        checklist.todos.forEach((todo) => {
          if (todo.isDone) {
            done += 1
          }
        })
      })
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
  },
  methods: {
    goToTaskDetails() {
      this.$router.push(`/details/${this.currBoard}/group/${this.groupId}/task/${this.task.id}`)
    },
    formatDate(timestamp) {
      return format(new Date(timestamp), 'dd MMM')
    },
  },
}
</script>
