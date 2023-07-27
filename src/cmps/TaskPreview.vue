<template>
  <section class="task-preview">
    <RouterLink :to="'/details/' + this.currBoard + '/group/' + this.groupId + '/task/' + task.id">
      <li v-if="task">
        <p>{{ task.title }}</p>
      </li>
    </RouterLink>
  </section>
</template>

<script>
export default {
  props: {
    groupId: {
      type: String,
      required: true,
    },
    task: {
      type: Object,
      required: true,
      // default: () => ({}),
    },
  },
  created() {
  },
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      return boardId
    }
  }
}

</script>

