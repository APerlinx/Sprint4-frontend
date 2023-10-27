<template>
  <div class="index-layout">
    <section class="board-container">
      <div class="starred-container">
        <div v-if="starredBoards.length" class="starred">
          <div class="starred-title">
            <span class="starred-icon"></span>
            <h2>Starred boards</h2>
          </div>

          <BoardList
            @star="starBoard"
            @recent="recentBoard"
            :boards="starredBoards"
            :isYourWorkSpace="false"
          />
        </div>
      </div>

      <div class="recent-container">
        <div v-if="recentBoards.length" class="recent">
          <div class="recent-title">
            <span class="recent-icon"></span>
            <h2>Recently viewed</h2>
          </div>

          <BoardList
            :boards="recentBoards"
            @star="starBoard"
            @recent="recentBoard"
            :isYourWorkSpace="false"
          />
        </div>
      </div>

      <div class="workspace">
        <div class="workspace-title">
          <div class="sub-workspace">
            <div class="user-title">{{ loggedInUser }}</div>
            <h3>Your boards</h3>
          </div>
        </div>
        <BoardList
          :boards="boards"
          @remove="removeBoard"
          @star="starBoard"
          @recent="recentBoard"
          @saveBoard="saveBoard"
          :isYourWorkSpace="true"
        />
      </div>
    </section>
  </div>
</template>

<script>
import BoardList from "../cmps/BoardList.vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {
      isAddBoard: false,
    };
  },

  created() {
    this.$store.commit("setChangeClr", false);
  },

  methods: {
    async starBoard(prvBoard) {
      try {
        const board = { ...prvBoard, isStarred: !prvBoard.isStarred };
        this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant star board");
      }
    },
    async recentBoard(prvBoard) {
      try {
        const board = { ...prvBoard, isRecent: true, recentAt: Date.now() };
        this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant star board");
      }
    },
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
    recentBoards() {
      return this.$store.getters.recentBoards;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser?.fullname.charAt(0);
    },
  },

  components: {
    BoardList,
    Popper,
  },
};
</script>
