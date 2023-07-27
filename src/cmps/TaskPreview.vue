<template>
  <section class="task-preview" @click="goToTaskDetails" draggable="false">
    <li v-if="task">
      <p>{{ task.title }}</p>
    </li>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      return boardId
    },
  },
  methods: {
    goToTaskDetails() {
      this.$router.push(`/details/${this.currBoard}/task/${this.task.id}`);
    },
  },
}
</script>
