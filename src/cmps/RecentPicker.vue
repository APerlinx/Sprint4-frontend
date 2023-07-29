<template>
 <div class="picker-modal">
          <div class="search-output">
            <ul class="output-list">
              <li v-for="board in recentBoards">
                <RouterLink :to="'/details/' + board._id">
                  <div class="row">
                    <img :src="board.imgUrl" />
                    <h2>{{ board.title }}</h2>
                  </div>
                </RouterLink>
              </li>
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
    recentBoards() {
      return this.$store.getters.recentBoards;
    },
  },
};
</script>

<style></style>
