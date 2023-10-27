<template>
    <div class="board" @click="goToDetails()">
      <div class="drop">
        <div @click.stop.prevent="toggleStar" class="btn-star" :class="boardClass"></div>
        <h2>{{ board.title?.toUpperCase() }}</h2>
      </div>
    </div>
  <!-- <button @click="removeBoard(board._id)">X</button> -->
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
    },
  },

  methods: {
    removeBoard(boardId) {
      this.$emit("remove", boardId);
    },
    toggleStar() {
      this.$emit("star", this.board);
    },
    goToDetails() {
      this.$emit("recent", this.board);
      this.$router.push(`/details/${this.board._id}`);
    },
  },
  
  computed: {
    imgUrl() {
      if (this.board.style.backgroundImage) {
        return `${this.board.style.backgroundImage}`;
      } else {
        return this.board.style.backgroundColor;
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
