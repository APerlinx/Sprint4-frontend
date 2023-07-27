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

  <Container
    groupName="group-tasks"
    orientation="vertical"
    dragClass="task-drag"
    dropClass="task-drop"
    @drag-end="handleDragEnd"
    :get-child-payload="retrieveTaskPayload"
    @drop="(e) => handleTaskDrop(group.id, e)"
    :className="`group-${group.id}`"
  >
        <Draggable
          v-for="task in group.tasks"
          :key="task.id"
          :groupId="group.id"
        >
          <TaskPreview :task="task" />
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
  data() {
    return {
      isSourceGroup: false,
    }
  },
  components: {
    TaskPreview,
    Container,
    Draggable,
  },
  computed: {},
  methods: {
    retrieveTaskPayload(index) {
      return {
        task: { ...this.group.tasks[index] },
        groupId: this.group.id,
      }
    },
    handleDragEnd(e) {
      this.isSourceGroup = e.isSource
    },
    handleTaskDrop(groupId, dropResult) {
      if (!this.sourceGroupId) {
        this.sourceGroupId = groupId
      } else if (!this.targetGroupId) {
        this.targetGroupId = groupId
      }

      if (this.group.id !== this.targetGroupId) return

      if (dropResult.removedIndex === null && dropResult.addedIndex === null)
        return

      this.$store.dispatch('moveTask', {
        sourceGroupId: this.sourceGroupId,
        targetGroupId: this.targetGroupId,
        dropResult,
        boardId: this.$route.params.boardId,
      })
      this.sourceGroupId = null
      this.targetGroupId = null
    },
    mounted() {
      this.isSourceGroup = false
    },
  },
}
</script>

<style scoped>
.task-drag {
  /* transition: transform 0.2s ease-in-out; */
  transform: rotate(5deg);
  /* box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); */
}

</style>
