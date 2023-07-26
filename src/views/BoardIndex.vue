<template>
  <section class="board-container">
    <!-- <div class="recently">
      <h2 class="title">Recently viewed</h2>
      <BoardList
      :boards="boards"
      /> 
    </div> -->

    <h3>YOUR WORKSPACE</h3>
    <div class="your">
      <h2 class="title">Your boards</h2>
      <BoardList :boards="boards" @remove="removeBoard" />
    </div>

    <!-- <div class="stared">
      <h2 class="title">stared</h2>
      <BoardList
      :boards="boards"
      /> 
    </div> -->
  </section>
</template>

<script>
import BoardList from "../cmps/BoardList.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "removeBoard", boardId });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant delete borad");
      }
    },
  },

  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  components: {
    BoardList,
  },
};
</script>
