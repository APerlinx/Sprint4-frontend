<template>
  <RouterLink :to="'/details/' + board._id">
    <div class="board">
      <div class="drop">
        <div @click.stop.prevent="toggleStar" class="icon">
          <i
            v-if="!isStarred"
            class="fa-regular fa-star"
            style="color: #ffff"
          ></i>
          <i
            v-if="isStarred"
            class="fa-solid fa-star"
            style="color: #ffbb00"
          ></i>
        </div>
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
      isStarred: this.board.isStarred,
    };
  },
  methods: {
    removeBoard(boardId) {
      this.$emit("remove", boardId);
    },
    toggleStar() {
      this.isStarred = !this.isStarred;
      const board = JSON.parse(JSON.stringify(this.board));
      board.isStarred = this.isStarred;
      this.$emit("star", board);
    },
  },
  computed: {
    imgUrl() {
      if (this.board.imgUrl) {
        return `url(${this.board.imgUrl})`;
      } else {
        return this.board.bgColor
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
