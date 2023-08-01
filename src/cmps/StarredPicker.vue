<template>
  <div class="starred-modal">
    <div class="search-output">
      <ul class="output-list">
        <li v-if="starredBoards" v-for="board in starredBoards">
          <RouterLink :to="'/details/' + board._id">
            <div class="row">
              <img :src="board.imgUrl" />
              <div class="text">
                <h2>{{ board.title }}</h2>
                <p>User work space</p>
              </div>
            </div>
          </RouterLink>
        </li>
        <div v-if="starredBoards.length === 0" class="empty-starred">
          <img src="../assets/styles/img/bg.svg" alt="">
          <p>Star important boards to access them quickly and easily.</p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    starredBoards() {
      return this.$store.getters.starredBoards;
    },
  },
};
</script>

<style></style>
