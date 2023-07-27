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
      required: true,
      // default: () => ({}),
    },
  },
  created() {
    console.log('task', this.task)
  },
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      console.log('boardId:', boardId)
      return boardId
    }
  }
}

</script>

