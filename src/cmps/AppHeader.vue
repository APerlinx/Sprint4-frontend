<template>
  <header>
    <nav>
      <RouterLink to="/">
        <i class="fa fa-trello"></i>
      </RouterLink>
      <RouterLink to="/board">Board</RouterLink>
      <RouterLink to="/b">Board Details</RouterLink>
      <RouterLink to="/review">Reviews</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
      <RouterLink to="/login">Login / Signup</RouterLink>
      <RouterLink @click="toggleCreateModal" to="#">Create</RouterLink>

      <div v-if="isCreateMenu" class="create">
        <p class="title" @click="toggleCreateModal">Create board</p>
        <p class="body">
          A board is made up of cards ordered on lists. use it to manage
          projects, track information, or organize anything.
        </p>
      </div>

      <div v-if="isCreateMode" class="create">
        <p class="title">Board title</p>
        <form @submit.prevent="saveBoard">
          <input
            @input="isTitle = true"
            autofocus
            type="text"
            v-model="boardToEdit.title"
          />
          <p v-if="!boardToEdit">Title is Req</p>
          <button>Create</button>
        </form>
      </div>
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
import { boardService } from "../services/board.service.local";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export default {
  data() {
    return {
      isCreateMenu: false,
      isCreateMode: false,
      isTitle: false,
      boardToEdit: boardService.getEmptyBoard(),
    };
  },
  methods: {
    toggleCreateModal() {
      if (!this.isCreateMenu) {
        this.isCreateMenu = true;
      } else if (this.isCreateMenu && !this.isCreateMode) {
        this.isCreateMode = true;
      } else {
        this.isCreateMenu = false;
        this.isCreateMode = false;
      }
    },

    async saveBoard() {
      try {
        await this.$store.dispatch({
          type: "addBoard",
          board: this.boardToEdit,
        });
        showSuccessMsg("Board added");
        this.toggleCreateModal();
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
  },
};
</script>
