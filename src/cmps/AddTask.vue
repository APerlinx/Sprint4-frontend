<template>
  <section class="add-task">
    <form @submit.prevent="saveTask">
      <input
        v-model="taskTitle"
        type="text"
        placeholder="Enter a title for this card..."
      />
      <div>
        <button class="form-btn" add-btn>Add card</button>
        <button class="form-btn" @click.prevent="closeComponent">X</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      taskTitle: '',
    };
  },
  methods: {
    saveTask() {
      this.$emit('addTask', this.taskTitle);
      this.taskTitle = '';
    },
    closeComponent() {
      this.$emit('close');
    },
  },
};
</script>
