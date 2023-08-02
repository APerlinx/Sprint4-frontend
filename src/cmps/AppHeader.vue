<template>
  <header class="app-header">
    <nav>
      <div class="left">
        <div class="menu">
          <img src="../assets/styles/img/menu.png" alt="" />
        </div>
        <div class="logo-container">
          <RouterLink to="/board">
            <div class="logo">
              <i class="fa fa-trello"></i>
              <h2>Trio</h2>
            </div>
          </RouterLink>
        </div>

        <div class="recent">
          <div
            class="header-btn"
            :class="{ checked: isPickerModalRecent }"
            @click="togglePickerModalRecent"
          >
            Recent
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div v-if="isPickerModalRecent" class="recent-modal">
            <RecentPicker
              @closeModal="isPickerModalRecent = false"
              v-click-outside="togglePickerModalRecent"
            />
          </div>
        </div>

        <div class="starred">
          <div
            class="header-btn"
            :class="{ checked: isPickerModalStarred }"
            @click="togglePickerModalStarred"
          >
            Starred
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div v-if="isPickerModalStarred" class="starred-modal">
            <StarredPicker
              @closeModal="isPickerModalStarred = false"
              @star="starBoard"
              v-click-outside="togglePickerModalStarred"
            />
          </div>
        </div>

        <div class="create-btn" @click="isCreateModal = true">
          <Popper arrow placement="right">
            <RouterLink to="#">Create</RouterLink>
            <template #content>
              <AddBoard @close="closeModal" @save="saveBoard" />
            </template>
          </Popper>
        </div>
      </div>

      <div class="right">
        <BoardFilter @filterByTxt="filterByTxt" />
        <span class="contrast"
          ><img src="../assets/styles/img/contrast.png" alt=""
        /></span>
        <span class="user">SZ</span>
      </div>
    </nav>
  </header>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import AddBoard from "../cmps/addboard.vue";
import BoardFilter from "../cmps/BoardFilter.vue";
import RecentPicker from "../cmps/RecentPicker.vue";
import StarredPicker from "../cmps/StarredPicker.vue";

import { clickOutsideDirective } from "../directives/index.js";

import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {
      isPickerModalStarred: false,
      isPickerModalRecent: false,
      isCreateModal: false,
    };
  },
  methods: {
    async saveBoard(board) {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board,
        });
        this.isAddBoard = false;
        this.closeModal()
        // this.$router.push("/details/" + this.savedBoard._id);
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant add board");
      }
    },

    async starBoard(board) {
      try {
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant star board");
      }
    },

    togglePickerModalRecent() {
      this.isPickerModalRecent = !this.isPickerModalRecent;
    },
    togglePickerModalStarred() {
      this.isPickerModalStarred = !this.isPickerModalStarred;
    },

    filterByTxt(filterBy) {
      this.$store.commit({ type: "setFilterBy", filterBy });
    },

    closeModal() {
      //dont work - bug
      this.isCreateModal = false;
      console.log(this.isCreateModal);
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    savedBoard() {
      return this.$store.getters.savedBoard;
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
  },
};
</script>
