<template>
  <section class="filter">
    <Popper arrow placement="bottom">
      <input class="search-bar" :class="{ 'search-changed': changeClr }" v-model="filterBy" @input="onSetFilterBy"
        type="text" placeholder="Search" v-focus />

      <template #content>
        <div class="open">
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
                    <!-- <img v-if="board.style" :src="board.imgUrl" alt="B" /> -->
                    <!-- <div v-else class="color" :style="{ background: board.bgColor }"></div> -->
                    <h2>{{ board.title }}</h2>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Popper>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {
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
     const boards =  this.$store.getters.filteredBoards;
     return boards.splice(0, 10)
    },
    changeClr() {
      return this.$store.state.boardStore.changeClr
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
