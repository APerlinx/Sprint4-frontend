<template>
  <div class="board-menu-container" :class="{ 'menu-visible': menuOpen }">
    <div v-if="showMenu && !backgroundPickerOpen && !activityOpen">
      <header class="menu-header">
        <div>
          <h1>Menu</h1>
          <span class="close-icon" @click="closeMenu"></span>
        </div>
        <hr />
      </header>
      <!-- <hr class="board-menu-header-divider" /> -->
      <div class="menu-content">
        <ul class="board-menu-nav">
          <li class="menu-item">
            <div>
              <span class="trello-icon"></span>
              <span class="txt">About this board</span>
            </div>
            <p>Add a description to your board</p>
          </li>
          <li class="menu-item preview" @click="openBackgroundPicker">
            <div
              class="background-preview"
              :style="
                background.includes('http') ||
                background.startsWith('data:image')
                  ? { backgroundImage: `url(${background})` }
                  : { backgroundColor: background }
              "
            ></div>
            <span class="txt">Change background</span>
          </li>
          <hr />

          <li class="menu-item">
            <span class="txt" @click.stop="openActivity"
              ><span class="activity-icon"></span>Activity</span
            >
          </li>
        </ul>
      </div>
    </div>

    <bgPicker
      :colorOption="colorOption"
      v-if="backgroundPickerOpen"
      @close="closeBackgroundPicker"
      @closeMenu="closeMenu"
      @backgroundChanged="handleBackgroundChange"
    />

    <ActivityLog
      :boardActivity="boardActivity"
      v-if="activityOpen"
      @close="closeActivity"
      @closeMenu="closeMenu"
    />
  </div>
</template>

<script>
import ActivityLog from './ActivityLog.vue'
import bgPicker from './BgPicker.vue'

export default {
  name: 'BoardMenu',
  emits: ['closeMenu'],
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },
    colorOption: {
      type: Object,
    },
    styleOption: {
      type: Object,
      default: () => ({}),
    },
    boardActivity: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      backgroundPickerOpen: false,
      activityOpen: false,
      showMenu: true, 
      background: this.getBackground(),
    }
  },
  methods: {
    closeMenu() {
      this.showMenu = true
      this.$emit('closeMenu')
    },
    openBackgroundPicker() {
      this.showMenu = false
      this.backgroundPickerOpen = true
    },
    closeBackgroundPicker() {
      this.showMenu = true
      this.backgroundPickerOpen = false
    },
    handleBackgroundChange(newBackground) {
      this.background = newBackground
    },
    getBackground() {
      if (this.styleOption.backgroundImage) {
        return this.styleOption.backgroundImage.slice(4, -1).replace(/"/g, '')
      }
      if (this.styleOption.backgroundColor) {
        return this.styleOption.backgroundColor
      }
      return 'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/volcano.svg'
    },
    openActivity() {
      this.showMenu = false
      this.activityOpen = true
    },
    closeActivity() {
      this.showMenu = true
      this.activityOpen = false
    },
  },
  components: {
    bgPicker,
    ActivityLog,
  },
}
</script>
