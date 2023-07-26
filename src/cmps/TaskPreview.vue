<template>
  <section class="task-preview">
    <li v-if="task">
      <p @click="openTaskDetails(task._id)">{{ task.title }}</p>
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
  created() {
    console.log('task', this.task)
  },
  methods: {
    openTaskDetails(id) {
      console.log('id:', id)
      this.$router.push({ id })
    },
  }
}
</script>

