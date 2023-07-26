<template>
  <div class="add-modal">
    <p class="title">Board title</p>
    <form @submit.prevent="saveBoard">
      <input
        @input="isTitle = true"
        autofocus
        type="text"
        v-model="boardToEdit.title"/>
      <!-- <p v-if="!boardToEdit.title">Board title is required</p> -->
      <button>Create</button>
    </form>
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
  },
};
</script>

<style></style>
