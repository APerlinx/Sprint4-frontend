<template>
  <div v-if="!isSearchMode" @click="isSearchMode = true" class="search-bar">
    <span class="material-symbols-outlined">search</span>
    <p>Serach</p>
  </div>

  <div v-if="isSearchMode" class="open">
    <input
      v-model="filterBy"
      @input="onSetFilterBy"
      type="text"
      placeholder="Search Trello"
    />

    <div class="search-output">
      <h5>RECENT BOARDS</h5>
      <span @click="isSearchMode=false" >x</span>

      <ul class="output-list">
        <li v-for="board in filteredBoards">
          <RouterLink :to="'/details/' + board._id">
            <div class="check">
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
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {
      isSearchMode: false,
      filterBy: "",
    };
  },
  methods: {
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
  computed: {
    filteredBoards() {
      return this.$store.getters.filteredBoards;
    },
  },
  components: {
    Popper,
    defineComponent,
  },
};
</script>

<style>
/* .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
} */
</style>
