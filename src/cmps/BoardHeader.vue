<template>
  <div>
    <header class="board-header" v-if="board">
      <nav class="nav-bar">
        <div class="title-tool-tip">
          <h1
            v-if="!isEditingTitle"
            @click="isEditingTitle = true"
            class="board-title"
          >
            {{ boardTitle }}
          </h1>
          <input
            v-else
            type="text"
            v-model="boardTitle"
            v-click-outside="handleOutsideClick"
            :style="{ width: `${inputWidth}px` }"
          />
          <span
            @click="toggeleIsStarred"
            :class="icon"
            class="star-icon"
          ></span>
        </div>

        <div class="tool-tip">
          <button class="filter">
            <span class="filter-icon">
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
                  fill="#fff"
                ></path>
              </svg>
            </span>
            Filter
          </button>
          <span class="line"></span>
          <div class="members">
            <div
              class="member"
              v-for="member in board.members"
              :key="member.id"
            >
              <img
                :src="member.imgUrl"
                :alt="member.fullname"
                class="member-image"
              />
            </div>
          </div>
          <span class="menu-icon" @click="toggleMenu"></span>
        </div>
      </nav>
    </header>
    <BoardMenu :menuOpen="menuOpen" :colorOption="board.backGround" @closeMenu="menuOpen = false" />
  </div>
</template>

<script>
import { clickOutsideDirective } from '../directives/index.js'
import BoardMenu from './BoardMenu.vue'

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
      menuOpen: false,
    }
  },
  created() {
    this.inputWidth = this.calculateInputWidth(this.boardTitle)
    if (this.board?.isStarred) this.isStarred = this.board.isStarred
  },
  methods: {
    handleOutsideClick() {
      this.isEditingTitle = false
    },
    toggleIsStarred() {
      this.isStarred = !this.isStarred
      this.$store.dispatch({
        type: 'saveBoard',
        board: { ...this.board, isStarred: this.isStarred },
      })
    },
    calculateInputWidth(text) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = '24px Arial'
      const metrics = context.measureText(text)
      return metrics.width
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },
  computed: {
    icon() {
      return this.isStarred ? 'full-star' : 'star'
    },
  },
  watch: {
    boardTitle(newValue) {
      this.inputWidth = this.calculateInputWidth(newValue)
    },
  },
  components: {
    BoardMenu,
  },
}
</script>
