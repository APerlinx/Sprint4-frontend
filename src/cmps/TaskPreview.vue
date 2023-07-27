<template>
  <section class="task-preview" @click="goToTaskDetails" draggable="false">
    <li v-if="task">
      <p>{{ task.title }}</p>
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
  computed: {
    currBoard() {
      const boardId = this.$store.getters.getCurrBoard?._id
      return boardId
    },
  },
  methods: {
    goToTaskDetails() {
      this.$router.push(`/details/${this.currBoard}/group/${this.groupId}/task/${this.task.id}`)
    },
  },
}
</script>
