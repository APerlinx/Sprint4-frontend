<template>
  <section class="task-preview" @click="goToTaskDetails" draggable="false">
    <li v-if="task">
      <p>{{ task.title }}</p>

      <div class="tool-tip">
        <span class="icon watch"></span>
        <span class="icon desc"></span>

        <span class="icon checklist"></span>
        <span class="checklist-counter">0/3</span>

        <span class="icon attach"></span>
        <span class="attach-counter">3</span>

        <span class="icon date"></span>
        <span class="date-counter">28 Jul</span>

        <span class="icon comment"></span>
        <span class="comment-counter">0/3</span>

        <span class="icon member"></span>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
      // default: () => ({}),
    },
  },
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      console.log('boardId:', boardId)
      return boardId
    },
  },
  methods: {
    goToTaskDetails() {
      this.$router.push(`/details/${this.currBoard}/task/${this.task.id}`)
    },
  },
}
</script>
