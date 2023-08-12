<template>
  <header class="app-header" v-click-outside="closeModals">
    <nav :class="{ 'header-changed': changeClr }">
      <div class="left">
        <RouterLink to="/board">
          <div class="logo">
            <i class="fa fa-trello"></i>
            <h2>Trio</h2>
          </div>
        </RouterLink>


        <div class="recent">
          <div @click="toggleRecentModal" class="header-btn" :class="{ checked: isPickerModalRecent }">
            Recent
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="recent-modal">
            <RecentPicker v-if="isPickerModalRecent" />
          </div>
        </div>

        <div class="middle">
          <div class="more">
            <p>More</p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="plus-btn">
            <span class="plus-icon"></span>
          </div>
        </div>

        <div class="starred">
          <div class="header-btn" @click="toggleStarredModal" :class="{ checked: isPickerModalStarred }">
            Starred
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="starred-modal">
            <StarredPicker v-if="isPickerModalStarred" @star="starBoard" />
          </div>
        </div>

        <div class="create-btn" :style="{ backgroundColor: isAddBoard ? '#e9f3ff' : '' }">
          <button @click="toggleAddBord" :style="{ color: isAddBoard ? '#0c66e4' : '' }">
            Create
          </button>
          <AddBoard v-if="isAddBoard" @save="saveBoard" @closeModal="toggleAddBord"  v-click-outside="toggleAddBord" />
        </div>
      </div>

      <div class="right">
        <div class="filter-container">
          <BoardFilter @filterByTxt="filterByTxt" />
          <div class="search-icon">
            <img class="search-icon-img" src="../assets/styles/img/search.svg" alt="" />
          </div>
        </div>

        <img class="mobile-search-icon" src="../assets/styles/img/search.svg" alt="" />
        <div class="notifiction-icon" @click="isNotifiction = !isNotifiction">
          <i class="fa-regular fa-bell fa-lg"></i>
          <div class="notifiction-dot" v-if="!fullUser?.isUserReadNotifications">
            <p>{{ fullUser?.notifications.length }}</p>
          </div>
        </div>


        <img class="mode" src="../assets/styles/img/contrast.png" alt="" />
        <span class="user" :class="{ 'user-changed': changeClr }">{{ loggedInUser }}</span>
      </div>
    </nav>
  </header>

  <Notification @setReadNotifications="setUserRead" v-if="isNotifiction" />
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import AddBoard from '../cmps/AddBoard.vue'
import BoardFilter from '../cmps/BoardFilter.vue'
import RecentPicker from '../cmps/RecentPicker.vue'
import StarredPicker from '../cmps/StarredPicker.vue'
import Notification from '../cmps/Notification.vue'

import { clickOutsideDirective } from '../directives/index.js'

import { defineComponent } from 'vue'
import Popper from 'vue3-popper'

export default {
  props: {
    changeClr: {
      type: Boolean
    }
  },
  data() {
    return {
      isPickerModalStarred: false,
      isPickerModalRecent: false,
      isAddBoard: false,
      isNotifiction: false,
      isUserRead: false
    };
  },
  created() {
  },
  methods: {
   
    toggleAddBord() {
      this.closeModals()
      this.isAddBoard = !this.isAddBoard
    },
    toggleRecentModal() {
      this.isPickerModalStarred = false
      this.isAddBoard = false
      this.isPickerModalRecent ? this.closeModals() : this.isPickerModalRecent = true
    },
    toggleStarredModal() {
      this.isPickerModalRecent = false
      this.isAddBoard = false
      this.isPickerModalStarred ? this.closeModals() : this.isPickerModalStarred = true
    },

    isUnreadNotifiction() {
      return this.fullUser.notifications.some(notification => !notification.isRead);
    },

    async saveBoard(board) {
      try {
        await this.$store.dispatch({
          type: 'addBoard',
          board,
        })
        this.isAddBoard = false
        this.closeModal()
        // this.$router.push("/details/" + this.savedBoard._id);
      } catch (err) {
        console.log(err)
      }
    },

    async starBoard(board) {
      try {
        await this.$store.dispatch({ type: 'updateBoard', board })
      } catch (err) {
        console.log(err)
        showErrorMsg('Cant star board')
      }
    },

    closeModals() {
      this.isPickerModalStarred = false
      this.isPickerModalRecent = false
    },

    filterByTxt(filterBy) {
      this.$store.commit({ type: 'setFilterBy', filterBy })
    },

  },
  computed: {
    changeClr() {
      return this.$store.state.boardStore.changeClr
    },
    loggedInUser() {
      const user = this.$store.getters.loggedinUser?.fullname
      if (!user) return ''
      const names = user.split(' ')
      if (names.length === 1) {
        return names[0].charAt(0)
      } else {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`
      }
    },
    fullUser() {
      return this.$store.getters.fullUser
    },
    userNotifications() {
      return this.fullUser?.notifications
    },

    savedBoard() {
      return this.$store.getters.savedBoard
    },

  },
  watch: {
    changeClr(newVal) {
      // console.log('changeClr updated to:', newVal)
    },
  },

  directives: {
    clickOutside: clickOutsideDirective,
  },
  components: {
    AddBoard,
    BoardFilter,
    Popper,
    defineComponent,
    RecentPicker,
    StarredPicker,
    Notification,
  },
}
</script>
