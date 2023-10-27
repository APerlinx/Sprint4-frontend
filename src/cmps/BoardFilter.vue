<template>
  <section class="filter">
    <div class="search-bar">
      <img class="search-icon" src="../assets/styles/img/search.svg" alt="" />
      <input
        name="text"
        id="text"
        :style="searchInputStyle" 
        :class="{ 'search-changed': changeClr }"
        v-model="filterBy"
        @input="onSetFilterBy"
        type="text"
        placeholder="Search"
        ref="searchInput"
        @click="this.isFilterOpen = !this.isFilterOpen"
      />
    </div>

    <div v-if="isFilterOpen" class="open" v-click-outside="closeSearch">
      <div class="search-output">
        <h5>RECENT BOARDS</h5>
        <ul class="output-list">
          <li v-for="board in filteredBoards" :key="board._id">
            <RouterLink :to="'/details/' + board._id">
              <div class="board-select"  @click = "isFilterOpen = false">
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
import { clickOutsideDirective } from "../directives/index.js";

export default {
  data() {
    return {
      filterBy: "",
      isFilterOpen: false,
    };
  },
  methods: {
    closeSearch() {
      if (!this.isFilterOpen) return;
      this.isFilterOpen = false;
    },
    onSetFilterBy() {
      this.$emit("filterByTxt", this.filterBy);
    },
  },
  computed: {
    filteredBoards() {
      const boards = this.$store.getters.filteredBoards;
      return boards.splice(0, 10);
    },
    changeClr() {
      return this.$store.state.boardStore.changeClr;
    },
    searchInputStyle() {
      return {
        width: this.isFilterOpen ? '700px' : '190px',
        border: this.isFilterOpen ? '1px solid #0052cc' : '1px solid rgba(197, 197, 197, 0.577)',
      };
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

