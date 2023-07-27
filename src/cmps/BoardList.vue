<template>
  <ul v-if="boards.length" class="board-list">
    <BoardPreview
     v-for="board in boards"
      :key="board._id" 
      :board="board" 
      @remove="$emit('remove', board._id)"
      @star="star"
      />
    </ul>
</template>

<script>
import BoardPreview from "../cmps/BoardPreview.vue";
export default {
  props: ["boards"],

  data() {
    return {};
  },
  methods: {
    star(board) {
      this.$emit("star", board)
    }
  },
  components: {
    BoardPreview,
  },
};
</script>

<style></style>
