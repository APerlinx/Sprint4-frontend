<template>
  <div class="board-list">
    <ul v-if="boards.length">
      <li v-for="board in boards" :key="board._id">
        <BoardPreview
          :board="board"
          @remove="$emit('remove', board._id)"
          @star="star"
          @recent="recent"
        />
      </li>

      <div class="index-create-board" v-if="isYourWorkSpace">
        <Popper>
          <button></button>
          <span>Create new board</span>
          <template #content>
            <div class="index-add-board">
              <AddBoard @save="saveBoard"/>
            </div>
          </template>
        </Popper>
      </div>
    </ul>
  </div>
</template>

<script>
import BoardPreview from "../cmps/BoardPreview.vue";
import AddBoard from "../cmps/addboard.vue";
import Popper from "vue3-popper";
import { clickOutsideDirective } from "../directives/index.js";

export default {
  props: {
    boards: {
      type: Array,
    },
    isYourWorkSpace: {
      type: Boolean,
    },
  },
  data() {
    return {
      isAddBoard: false,
    };
  },
  methods: {
    star(board) {
      this.$emit("star", board);
    },
    recent(board) {
      this.$emit("recent", board);
    },
    saveBoard(board) {
      this.$emit("saveBoard", board);
      this.toggleIsAddBoard();
    },
    toggleIsAddBoard() {
      this.isAddBoard = false;
    },
  },
  components: {
    BoardPreview,
    AddBoard,
    Popper,
  },

  directives: {
    clickOutside: clickOutsideDirective,
  },
};
</script>

<style></style>
