<template>
  <section class="add-task" v-click-outside="closeComponent">
    <form @submit.prevent="saveTask">
      <div class="input-wrapper">
        <textarea
          v-model="taskTitle"
          rows="3"
          placeholder="Enter a title for this card..."
          v-focus
        ></textarea>
      </div>

      <div class="form-btn">
        <button class="add-btn">Add card</button>
        <button @click.prevent="closeComponent">
          <span class="icon close"></span>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { focusDirective, clickOutsideDirective } from '../directives/index.js'

export default {
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      taskTitle: '',
    }
  },
  methods: {
    saveTask(event) {
      event.stopPropagation()
      this.$emit('addTask', {
        groupId: this.groupId,
        taskTitle: this.taskTitle,
      })
    },
    closeComponent() {
      this.taskTitle = ''
      this.$emit('close')
    },
  },
  directives: {
    focus: focusDirective,
    clickOutside: clickOutsideDirective,
  },
}
</script>
