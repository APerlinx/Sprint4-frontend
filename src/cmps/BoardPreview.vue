<template>
  <RouterLink :to="'/details/' + board._id">
    <div class="board">
      <h2>{{ board.title.toUpperCase() }}</h2>
    </div>
  </RouterLink>
  <!-- <button @click="removeBoard(board._id)">X</button> -->
</template>

<script>
export default {
  props: ["board"],

  data() {
    return {};
  },
  methods: {
    removeBoard(boardId) {
      this.$emit("remove", boardId);
    },
  },
  computed: {
    imgUrl() {
      return `url(${this.board?.imgUrl})` || "";
    },
  },
};
</script>

<style>
.board {
  background-image: v-bind(imgUrl);
}
</style>
