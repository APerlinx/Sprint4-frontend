<template>
  <section class="task-preview">
    <RouterLink :to="'/task/' + task.id">
      <li v-if="task">
        <p>{{ task.title }}</p>
      </li>
      <pre>{{ currBoard }}</pre>
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

    data() {
      return {
        boardId: null
      }
    },
  },
  created() {
    const boardId = this.$route.params.boardId;
    this.boardId = boardId
  },
  methods: {
    // openTaskDetails(id) {
    //   console.log('id:', id)
    //   // this.$router.push({ id })
  },
  computed: {
    currBoard() {
      this.$store.getters.getCurrenBoard;
    },
  },
};
</script>
