<template>
  <section class="filter">

    <Popper arrow placement="bottom">
      <input
        class="search-bar"
        v-model="filterBy"
        @input="onSetFilterBy"
        type="text"
        placeholder="Search"
      />

      <template #content>
        <div class="open">
          <div class="search-output">
            <h5>RECENT BOARDS</h5>

            <ul class="output-list">
              <li v-for="board in filteredBoards" :key="board._id">
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
