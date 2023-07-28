<template>
  <header>
    <nav>
      <div class="logo-container">
        <RouterLink to="/board">
          <div class="logo">
            <i class="fa fa-trello"></i>
            <h2>Trello</h2>
          </div>
        </RouterLink>
      </div>

      <div class="create-btn">
        <Popper arrow placement="right">
          <RouterLink to="#">Create</RouterLink>
          <template #content>
            <AddBoard @close="closeModal" @save="saveBoard" />
          </template>
        </Popper>
      </div>

    
        <BoardFilter @filterByTxt="filterByTxt" />

    </nav>
  </header>
</template>
<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import AddBoard from "../cmps/addboard.vue";
import BoardFilter from "../cmps/BoardFilter.vue";

import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
  data() {
    return {};
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
    Popper,
    defineComponent,
  },
};
</script>
