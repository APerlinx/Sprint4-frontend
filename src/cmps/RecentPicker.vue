<template>
  <div class="recent-modal">
    <div class="search-output">
      <ul class="output-list">
        <li v-for="board in recentBoards">
          <RouterLink @click="closeModal" :to="'/details/' + board._id">
            <div class="row">
              <img :src="board.imgUrl" />
              <div class="text">
                <h2>{{ board.title }}</h2>
                <p>User Workspace</p>
              </div>
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
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  },
};
</script>

<style></style>
