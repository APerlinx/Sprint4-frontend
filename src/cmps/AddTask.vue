<template>
  <section class="add-task" v-click-outside="closeComponent">
    <form @submit.prevent="saveTask">

      <div class="form-input">
        <input
          v-model="taskTitle"
          type="text"
          placeholder="Enter a title for this card..."
          v-focus
        />
      </div>

      <div class="form-btn">
        <button class="form-btn" add-btn>Add card</button>
        <button class="form-btn" @click.prevent="closeComponent">X</button>
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
    saveTask() {
      this.$emit('addTask', {
        groupId: this.groupId,
        taskTitle: this.taskTitle,
      })
      this.taskTitle = ''
    },
    closeComponent() {
      this.$emit('close')
    },
  },
  directives: {
    focus: focusDirective,
    clickOutside: clickOutsideDirective,
  },
}
</script>
