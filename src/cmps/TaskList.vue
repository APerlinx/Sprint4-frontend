<template>
  <Container
    class="tasks-container"
    orientation="vertical"
    v-if="tasks"
    :get-child-payload="getChildPayload"
    group-name="col-items"
    @drop="onDrop($event)"
  >
    <Draggable v-for="item in items" :key="item.id">
      <task-preview :task="item" :groupId="groupId" />
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


