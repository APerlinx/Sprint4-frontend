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
      <div class="scroll-container">
        <taskList
          @moveTasks="replaceTasks"
          :tasks="group.tasks"
          :groupId="group.id"
        />
      </div>
      <slot name="actions"></slot>
    </div>
  </li>
</template>

<script>
import TaskList from './TaskList.vue'
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
      sourceGroupId: null,
      targetGroupId: null,
      containerKey: 0,
      removedIndex: null,
      currBoard: {},
      currTask: {},
    }
  },
  components: {
    TaskList,
    Container,
    Draggable,
  },
  created() {
    this.currBoard = this.$store.getters.getCurrBoard
  },
  computed: {},
  methods: {
    replaceTasks(tasks) {
      let group = JSON.parse(JSON.stringify(this.group))
      // group.tasks = tasks
      this.$emit('updateGroup', { info: { tasks, group } })
    },
  },
}
</script>

