<template>
  <section class="task-preview">
    <RouterLink :to="'/details/task/' + task.id">
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
    console.log('task', this.task)
  },
  methods: {
    // openTaskDetails(id) {
    //   console.log('id:', id)
    //   // this.$router.push({ id })
  },
}

</script>

