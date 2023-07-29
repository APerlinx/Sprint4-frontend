<template>
  <Container
    class="tasks-container"
    orientation="vertical"
    v-if="tasks"
    :get-child-payload="getChildPayload"
    group-name="col-items"
    @drop="onDrop($event)"
    :dragClass="'card-ghost'"
    :drop-placeholder="dropPlaceholderOptions"
  >
    <Draggable v-for="item in items" :key="item.id" class="draggable-item" drag-class="card-ghost">
      <div class="card">
        <task-preview :task="item" :groupId="groupId" />
      </div>
    </Draggable>
  </Container>
</template>

<script>
import taskPreview from './TaskPreview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/util.service.js'

export default {
  name: 'task-list',
  props: {
    groupId: {
      type: String,
    },
    tasks: {
      type: Array,
    },
  },
  data() {
    return {
      items: [],
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '0',
        showOnTop: false,
      },
    }
  },
  watch: {
    tasks: {
      immediate: true,
      handler(newVal) {
        this.items = JSON.parse(JSON.stringify(newVal))
      },
    },
  },
  methods: {
    onDrop(dropRes) {
      this.items = applyDrag(this.items, dropRes)
      this.$emit('moveTasks', this.items)
    },
    getChildPayload(idx) {
      return this.items[idx]
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable,
  },
}
</script>

<style>
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border-radius: 8px;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(0deg)
}
/* .draggable-item {
  transition-duration: 80ms !important;
} */
</style>
