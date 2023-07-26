<template>

<div class="overlay"  v-if="isAddBoard" @click="isAddBoard = false"></div>
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

    <div class="create-board">
      <div @click="isAddBoard = !isAddBoard" class="title">
        Create new board
      </div>
      <div class="index-modal">
        <AddBoard
        @save="saveBoard"
         v-if="isAddBoard" />
      </div>
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
import AddBoard from "../cmps/AddBoard.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export default {
  data() {
    return {
      isAddBoard: false,
    };
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

    async saveBoard(board) {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board,
        });
        this.isAddBoard = false
        this.$router.push('/details/' + this.savedBoard._id)
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant add board");
      }
    },
    
  },

  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    savedBoard() {
      return this.$store.getters.savedBoard
    }
  },
  components: {
    BoardList,
    AddBoard,
  },
};
</script>
