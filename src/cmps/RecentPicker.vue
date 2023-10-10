<template>
  <div class="recent-modal">
  <div v-if="!recentBoards" ><MiniLoader /></div>
    <ul class="output-list">
      <li v-for="board in recentBoards">
        <RouterLink @click="closeModal" :to="'/details/' + board._id">
          <div class="row">
            <div
              v-if="board.style.backgroundImage"
              class="imgPreview"
              :style="{
                background: board.style.backgroundImage,
                'background-size': 'cover',
                'background-position': 'center',
              }"
            ></div>
            <div
              v-else
              class="colorPreview"
              :style="{ background: board.style.backgroundColor }"
            ></div>
            <div class="text">
              <h2>{{ board.title }}</h2>
              <p>{{ loggedinUser.fullname }} work space</p>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import MiniLoader from "../cmps/MiniLoader.vue";

export default {
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    recentBoards() {
      return this.$store.getters.recentBoards;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  components: {
    MiniLoader,
  },
};
</script>

<style></style>
