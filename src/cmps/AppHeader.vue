<template>
  <header class="app-header">
    <nav>
      <div class="logo-container">
        <RouterLink to="/board">
          <div class="logo">
            <i class="fa fa-trello"></i>
            <h2>Trello</h2>
          </div>
        </RouterLink>
      </div>

      <div class="create-btn">
        <Popper arrow placement="right">
          <RouterLink to="#">Create</RouterLink>
          <template #content>
            <AddBoard @close="closeModal" @save="saveBoard" />
          </template>
        </Popper>
      </div>

      <div class="pickers">
        <div class="starred">
          <button
            :style="{ position: 'relative' }"
            @click="togglePickerModal('StarredPicker')"
          >
            Starred 
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div class="recent">
          <button
            :style="{ position: 'relative' }"
            @click="togglePickerModal('RecentPicker')">Recent 
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div v-if="isPickerModal" class="pickers-modal">
          <Component v-click-outside="togglePickerModal" :is="tab" />
        </div>
      </div>

      <BoardFilter @filterByTxt="filterByTxt" />
    </nav>
  </header>
</template>
<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import AddBoard from "../cmps/addboard.vue";
import BoardFilter from "../cmps/BoardFilter.vue";
import RecentPicker from "../cmps/RecentPicker.vue";
import StarredPicker from "../cmps/StarredPicker.vue";

import { clickOutsideDirective } from '../directives/index.js'


import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {
      tab: "",
      isPickerModal: false,
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
        this.$router.push("/details/" + this.savedBoard._id);
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant add board");
      }
    },

    togglePickerModal(type) {
      this.tab = type;
      this.isPickerModal = !this.isPickerModal;
    },

    filterByTxt(filterBy) {
      this.$store.commit({ type: "setFilterBy", filterBy });
    },

    closeModal() {
      this.isAddBoard = false;
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
