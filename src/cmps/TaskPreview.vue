<template>
  <section class="task-preview">
    <RouterLink :to="'/details/' + this.currBoard + '/task/' + task.id">
      <li v-if="task">
        <p>{{ task.title }}</p>
      </li>
    </RouterLink>
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
  created() {
    // console.log('task', this.task)
  },
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      console.log("🚀 ~ file: TaskPreview.vue:26 ~ currBoard ~ this.$store.getters.getCurrenBoard:", this.$store.getters.getCurrenBoard)
      console.log('boardId:', boardId)
      return boardId
    }
  }
}

</script>

