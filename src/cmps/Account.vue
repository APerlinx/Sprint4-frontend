<template>
  <div class="account-modal">
    <h5 class="headline">Account</h5>
    <div class="user-details">
      <div class="avatar">{{ loggedInUserAvatar }}</div>
      <h6>{{ loggedinUser?.fullname }}</h6>
      <p>{{ loggedinUser.email }}</p>
    </div>
    <router-link :to="'/login'">
      <div class="switch"><h4>Switch Account</h4></div>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUserAvatar() {
      const user = this.$store.getters.loggedinUser?.fullname;
      if (!user) return "";
      const names = user.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0);
      } else {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
      }
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {},
};
</script>
