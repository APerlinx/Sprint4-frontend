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
    </ul>
  </div>
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
      this.$emit("star", board);
    },
    recent(board) {
      this.$emit("recent", board);
    },
  },
  components: {
    BoardPreview,
  },
};
</script>

<style></style>
