<template>
  
  <div class="overlay"  v-if="isAddBoard" @click="isAddBoard = false"></div>

  <header>
    <nav>
      <RouterLink  to="/board"><i class="fa fa-trello"></i></RouterLink>
      <RouterLink to="/review">Reviews</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
      <RouterLink to="/login">Login / Signup</RouterLink>
      <RouterLink @click="isAddBoard=!isAddBoard" to="#">Create</RouterLink>
      <AddBoard
       v-if="isAddBoard"
       @save="saveBoard" />
    </nav>

    <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </RouterLink>
      <span>{{ loggedInUser.score?.toLocaleString() }}</span>
      <img :src="loggedInUser.imgUrl" />
    </section>
  </header>
</template>
<script>

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import AddBoard from "../cmps/AddBoard.vue";

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
        this.isAddBoard = false
        this.$router.push('/details/' + this.savedBoard._id)
        
      } catch (err) {
        console.log(err);
        showErrorMsg("Cant add board");
      }
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
  },
};
</script>
