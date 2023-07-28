<template>
  <section class="board-container">
    <h3>Your workspace</h3>
    <div class="workspace">
      <div class="your">
        <BoardList
          :boards="filteredBoards"
          @remove="removeBoard"
          @star="starBoard"
        />
      </div>

      <div class="create-board">
        <Popper arrow placement="right">
          <div class="title">Create new board</div>
          <template #content>
            <AddBoard @save="saveBoard" />
          </template>
        </Popper>
      </div>
    </div>

    <div v-if="starredBoards.length > 0" class="stared">
      <h2 class="title">Starred boards</h2>
      <BoardList @star="starBoard" :boards="starredBoards" />
    </div>
  </section>

</template>

<script>
import BoardList from "../cmps/BoardList.vue";
import AddBoard from "../cmps/AddBoard.vue";

import { defineComponent } from "vue";
import Popper from "vue3-popper";

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
    // closeModal() {
    //   this.isAddBoard = false;
    // },

    async starBoard(board) {
      try {
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant star board");
      }
    },

    async saveBoard(board) {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board,
        });
        this.isAddBoard = false;
        this.$router.push("/details/" + this.savedBoard._id);
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
      return this.$store.getters.savedBoard;
    },
    starredBoards() {
      return this.$store.getters.starredBoards;
    },
    filteredBoards() {
      return this.$store.getters.filteredBoards;
    },
  },
  components: {
    BoardList,
    AddBoard,
    Popper,
    defineComponent,
  },
};
</script>
