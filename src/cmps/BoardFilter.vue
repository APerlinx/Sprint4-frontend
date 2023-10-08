<template>
  <section class="filter">

    <div class="search-bar">
      <img class="search-icon" src="../assets/styles/img/search.svg" alt="" />
      <input :class="{ 'search-changed': changeClr }" v-model="filterBy" @input="onSetFilterBy" type="text"
        placeholder="Search" ref="searchInput" @click="onInputClick" />
    </div>

    <div v-if="isFilterOpen" class="open" v-click-outside="closeSearch">
      <div class="search-output">
        <h5>RECENT BOARDS</h5>
        <ul class="output-list">
          <li v-for="board in  filteredBoards " :key="board._id">
            <RouterLink :to="'/details/' + board._id">
              <div class="board-select">
                <div v-if="board.style.backgroundImage" class="imgPreview"
                  :style="{ background: board.style.backgroundImage, 'background-size': 'cover', 'background-position': 'center' }">
                </div>
                <div v-else class="colorPreview" :style="{ background: board.style.backgroundColor }">
                </div>
                <h2>{{ board.title }}</h2>
              </div>
            </RouterLink>
          </li>
        </ul>
        <div class="help-us">Help us improve your search result!</div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import Popper from "vue3-popper";
import { clickOutsideDirective } from '../directives/index.js'

export default {
  data() {
    return {
      filterBy: "",
      isFilterOpen: false
    };
  },
  methods: {
    closeSearch() {
      if (!this.isFilterOpen) return
      this.onInputClick()
    },
    onInputClick() {
      this.isFilterOpen = !this.isFilterOpen

      const serachBar = this.$refs.searchInput;
      if (this.isFilterOpen) {
        serachBar.style.width = '700px';
      } else {
        serachBar.style.width = '190px';
      }
    },
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
  computed: {
    filteredBoards() {
      const boards = this.$store.getters.filteredBoards;
      return boards.splice(0, 10)
    },
    changeClr() {
      return this.$store.state.boardStore.changeClr
    },
  },
  directives: {
    clickOutside: clickOutsideDirective,
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
