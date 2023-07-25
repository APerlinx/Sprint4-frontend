<template>
  <header>
    <nav>
      <RouterLink to="/">
        <span role="img" aria-label="logo">Trello</span>
      </RouterLink>
      <RouterLink to="/board">Board</RouterLink>
      <RouterLink to="/review">Reviews</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
      <RouterLink to="/login">Login / Signup</RouterLink>
      <RouterLink to="#">Create</RouterLink>

      <div class="create">
        <form action="">
          <input type="text">
        </form>
        <p class="title">Create board</p>
        <p class="body">Create board</p>
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
export default {
  data() {
    return {
      isCreate: false
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>
