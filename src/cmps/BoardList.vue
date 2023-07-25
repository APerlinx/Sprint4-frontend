<template>
  <ul v-if="boards.length" class="board-list">
    <BoardPreview
     v-for="board in boards"
      :key="board._id" 
      :board="board" />
  </ul>
</template>

<script>
import BoardPreview from "../cmps/BoardPreview.vue";
export default {
  props: ["boards"],

  data() {
    return {};
  },
  components: {
    BoardPreview,
  },
};
</script>

<style></style>
