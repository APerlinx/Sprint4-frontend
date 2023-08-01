<template>
  <div class="board-menu-container" :class="{ 'menu-visible': menuOpen }">
    <div v-if="!backgroundPickerOpen">
      <div class="menu-header">
        <h1>Menu</h1>
        <button @click="closeMenu">Close</button>
      </div>
      <hr class="board-menu-header-divider" />
      <div class="menu-content">
        <ul class="board-menu-nav">
          <li class="menu-item">
            <div>
              <span class="trello-icon"></span>
              <span>About this board</span>
            </div>
            <p>Add description to your board</p>
          </li>
          <li class="menu-item" @click="openBackgroundPicker">
            <span>Change Background</span>
            <div class="background-preview"></div>
          </li>
          <li class="menu-item">
            <span>Activity</span>
          </li>
        </ul>
      </div>
    </div>

    <bgPicker :colorOption="colorOption" v-if="backgroundPickerOpen" @close="closeBackgroundPicker" @closeMenu="closeMenu" />
  </div>
</template>

<script>
import bgPicker from './BgPicker.vue'

export default {
  name: 'BoardMenu',
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },
    colorOption: {
        type: Object
    }
  },
  data() {
    return {
      backgroundPickerOpen: false
    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
    },
    openBackgroundPicker() {
      this.backgroundPickerOpen = true;
    },
    closeBackgroundPicker() {
      this.backgroundPickerOpen = false;
    }
  },
  components: {
    bgPicker,
  }
}
</script>
