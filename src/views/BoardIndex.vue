<template>
  <div class="index-layout" ref="indexLayout"></div>
  <div class="index-layout">
    <section class="board-container">
      <div v-if="starredBoards.length > 0" class="starred">
        <div class="starred">
          <div class="starred-title">
            <span class="starred-icon"></span>
            <h2>Starred boards</h2>
          </div>
        </div>
        <BoardList @star="starBoard" :boards="starredBoards" />
      </div>

      <!-- <div v-if="recentBoards.length > 0" class="recent">
        <div class="recently">
          <div class="recently-title">
            <span class="recently-icon"></span>
            <h2>Recently viewed</h2>
          </div>
        </div>
        <BoardList @star="starBoard" :boards="recentBoards" />
      </div> -->

      <div class="workspace-title">
        <div class="sub-workspace">
          <div class="user-title">{{ loggedInUser }}</div>
          <h3>Your boards</h3>
        </div>
      </div>
      <div class="workspace">
        <div>
          <BoardList :boards="boards" @remove="removeBoard" @star="starBoard" />
        </div>

        <div class="index-create-board">
          <Popper arrow placement="right">
            <div class="board-title">Create new board</div>
            <template #content>
              <div class="index-container">
                <AddBoard
                  @close="scrollWindowToIndexLayout()"
                  @save="saveBoard"
                />
              </div>
            </template>
          </Popper>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BoardList from "../cmps/BoardList.vue";
import AddBoard from "../cmps/addboard.vue";

import { defineComponent } from "vue";
import Popper from "vue3-popper";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";


export default {
  data() {
    return {};
  },

  created() {
  },

  methods: {
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "removeBoard", boardId });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant delete borad");
      }
    },


    async starBoard(board) {
      try {
        console.log(board.isStarred);
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
        // this.$router.push("/details/" + this.savedBoard._id);
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant add board");
      }
    },
    scrollWindowToIndexLayout() {
      const indexLayoutElement = this.$refs.indexLayout;

      if (indexLayoutElement) {
        const scrollOptions = {
          top: indexLayoutElement.offsetTop,
          behavior: "smooth", // Use "auto" for immediate scroll
        };

        // Scroll the window to the index layout element
        window.scrollTo(scrollOptions);
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
    recentBoards() {
      return this.$store.getters.recentBoards;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser?.fullname.charAt(0);
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
