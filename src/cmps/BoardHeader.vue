<template>
  <header class="board-header" v-if="board">
    <nav class="nav-bar">
      <h1 v-if="!isEditingTitle" @click="isEditingTitle = true">
        {{ boardTitle }}
      </h1>
      <input
        v-else
        type="text"
        v-model="boardTitle"
        v-click-outside="handleOutsideClick"
        :style="{ width: `${inputWidth}px` }"
      />
      <span @click="toggeleIsStarred" :class="icon"></span>
    </nav>
  </header>
</template>

<script>
import { clickOutsideDirective } from '../directives/index.js' 

export default {
  props: {
    board: {
      type: Object,
    },
  },
  directives: {
    clickOutside: clickOutsideDirective,
  },
  data() {
    return {
      isEditingTitle: false,
      boardTitle: 'Trello dev team',
      inputWidth: 0,
      isStarred: false,
    }
  },
  created() {
    this.inputWidth = this.calculateInputWidth(this.boardTitle)
    if(this.board?.isStarred) this.isStarred = this.board.isStarred
  },

  methods: {
    handleOutsideClick() {
      this.isEditingTitle = false
    },
    toggeleIsStarred() {
      this.isStarred = !this.isStarred;
      this.$store.dispatch({ type: 'saveBoard', board: { ...this.board, isStarred: this.isStarred } })
    },
    calculateInputWidth(text) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = '24px Arial'
      const metrics = context.measureText(text)
      return metrics.width
    },
  },
  computed: {
    icon() {
      return this.isStarred ? 'full-star' : 'star';
    },
  },
  watch: {
    boardTitle(newValue) {
      this.inputWidth = this.calculateInputWidth(newValue)
    },
  },
}
</script>
