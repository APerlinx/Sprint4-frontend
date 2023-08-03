<template>
  <RouterLink :to="'/details/' + board._id">
    <div class="board">
      <div class="drop">
        <div
          @click.stop.prevent="toggleStar"
          class="btn-star"
          :class="boardClass"
        ></div>
        <h2>{{ board.title.toUpperCase() }}</h2>
      </div>
    </div>
  </RouterLink>

  <!-- <button @click="removeBoard(board._id)">X</button> -->
</template>

<script>
export default {
  props: ["board"],

  data() {
    return {
    };
  },
  
  methods: {
    removeBoard(boardId) {
      this.$emit("remove", boardId);
    },
    toggleStar() {
      const board = JSON.parse(JSON.stringify(this.board));
      board.isStarred = !board.isStarred;
      this.$emit("star", board);
    },
  },
  computed: {
    imgUrl() {
      if (this.board.imgUrl) {
        return `url(${this.board.imgUrl})`;
      } else {
        return this.board.bgColor;
      }
    },
    boardClass() {
      return {
        unstarred: !this.board.isStarred,
        starred: this.board.isStarred,
      }
    },
  },
};
</script>

<style>
.board {
  background-image: v-bind(imgUrl);
  background-position: center;
  background-size: cover;
}
</style>
