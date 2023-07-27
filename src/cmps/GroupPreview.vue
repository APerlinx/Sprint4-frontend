<template>
  <li class="group-preview">
    <div class="group-card">
      <div class="group-header">
        <input class="group-title" type="text" :value="group.title" @input="updateTitle($event.target.value)" />
        <button class="remove-group-button" @click="$emit('remove', group.id)">
          x
        </button>
      </div>

      <Container :get-child-payload="retrieveTaskPayload" @drop="handleTaskDrop">
        <Draggable v-for="task in group.tasks" :key="task.id">
          <TaskPreview @click="openTask(board, group, task)" :groupId="this.group.id" :task="task" />
        </Draggable>
      </Container>

      <slot name="actions"></slot>
    </div>
  </li>
</template>

<script>
import TaskPreview from './TaskPreview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  components: {
    TaskPreview,
    Container,
    Draggable,
  },
  computed: {},
  methods: {
    openTask(board, group, task) {
      this.isTaskDetail = true;
      console.log('isTaskDetail:', this.isTaskDetail)
      // this.$store.commit({ type: 'setCurrGroup', group })
      this.$store.commit({ type: 'setCurrTask', task })
    },
    retrieveTaskPayload(index) {
      return this.group.tasks[index]
    },
    handleTaskDrop(dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        this.$store.dispatch('moveTask', {
          sourceGroupId: this.group.id,
          targetGroupId: this.group.id,
          dropResult: dropResult,
        })
      }
    },
  },
}
</script>
