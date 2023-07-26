<template>
  <li class="group-preview">
    <div class="group-card">
      <div class="group-header">
        <input
          class="group-title"
          type="text"
          :value="group.title"
          @input="updateTitle($event.target.value)"
        />
        <button class="remove-group-button" @click="$emit('remove', group.id)">
          x
        </button>
      </div>

      <!-- Render each task using the TaskPreview component -->
      <template v-if="group">
        <TaskPreview v-for="task in group.tasks" :key="task.id" :task="task" />
      </template>

      <slot name="actions"></slot>
    </div>
  </li>
</template>

<script>
import TaskPreview from './TaskPreview.vue'

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  components: {
    TaskPreview,
  },
  computed: {},
  methods: {},
}
</script>
