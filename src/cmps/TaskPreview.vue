<template>
<section class="task-preview">
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
}
</script>

