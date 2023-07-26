<template>
  <div class="add-modal">
    <div class="action">
      <div class="close"></div>
      <h3 class="title">Create board</h3>
      <div @click="closeModal" class="close">x</div>
    </div>

    <!-- <div class="board-layout">layout exemple</div> -->

    <!-- <div class="bg-picker">
      <h6 class="title">Background</h6>
      <div class="bg-img"></div>
      <div class="bg-color"></div>
    </div> -->

    <div class="add-board-input">
      <h2>Board title <span>*</span></h2>
      <form @submit.prevent="saveBoard">
        <input
          autofocus
          type="text"
          v-model="boardToEdit.title"
        />
        <p v-if="!boardToEdit.title">👋 Board title is required</p>
        <button></button>
        <div @click="saveBoard" class="create-btn">Create</div>
      </form>
    </div>
  </div>
</template>

<script>
import { boardService } from "../services/board.service.local";

export default {
  data() {
    return {
      isTitle: false,
      boardToEdit: boardService.getEmptyBoard(),
    };
  },
  methods: {
    saveBoard() {
      this.$emit("save", this.boardToEdit);
    },
    closeModal() {
      this.$emit("close");
    }
  },
  // watch: {
  //   'boardToEdit.title'(newTitle) {
  //     if (newTitle.length > 0) {
  //       this.isTitle = true
  //     } else {
  //       this.isTitle = false
  //     }
  //   },
  // },
};
</script>

<style></style>
