<template>
  <div class="overlay" v-if="isAddBoard" @click="isAddBoard = false"></div>

  <header>
    <nav>
      <RouterLink to="/board">
        <div class="logo">
          <i class="fa fa-trello"></i>
          <h2>Trello</h2>
        </div>
      </RouterLink>

      <div class="create">
        <RouterLink @click="isAddBoard = !isAddBoard" to="#">Create</RouterLink>
        <AddBoard v-if="isAddBoard" @close="closeModal" @save="saveBoard" />
      </div>
    </nav>
    <div class="actions">
      <BoardFilter @filterByTxt="filterByTxt" />

      <div class="loggedin-user">
        <h2>SZ</h2>
      </div>
    </div>

    <!-- <RouterLink :to="`/user/${loggedInUser._id}`">
      {{ loggedInUser.fullname }}
    </RouterLink> -->
    <!-- <RouterLink to="/login">Login / Signup</RouterLink> -->
    <!-- <section class="loggedin-user" v-if="loggedInUser"> -->
    <!-- <span>{{ loggedInUser.score?.toLocaleString() }}</span> -->
    <!-- <img :src="loggedInUser.imgUrl" /> -->
    <!-- </section> -->
  </header>
</template>
<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import AddBoard from "../cmps/AddBoard.vue";
import BoardFilter from "../cmps/BoardFilter.vue";

export default {
  data() {
    return {
      isAddBoard: false,
    };
  },
  methods: {
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

    filterByTxt(filterBy) {
      this.$store.commit({ type: "setFilterBy", filterBy });
    },

    closeModal() {
      this.isAddBoard = false;
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    savedBoard() {
      return this.$store.getters.savedBoard;
    },
  },
  components: {
    AddBoard,
    BoardFilter,
  },
};
</script>
