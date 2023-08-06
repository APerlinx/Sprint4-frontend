<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <HomeHeader v-if="showHomeHeader" />
    <AppHeader v-else />
    <RouterView />
    <UserMsg />
  </div>
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import UserMsg from "./cmps/UserMsg.vue";
import AppHeader from "./cmps/AppHeader.vue";
import HomeHeader from "./cmps/HomeHeader.vue";

export default {
  data() {
    return {
      showHomeHeader: true,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
    this.$store.dispatch({ type: "loadUsers" });

    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
    socketService.on('on-notifcation-push', this.addNotifcation)
  },
  mounted() {
    this.appHeader = true;
  },
  methods: {
    addNotifcation({ notification }) {
      this.$store.dispatch({ type: 'addNotifcation', notification })
    }
  },
  components: {
    UserMsg,
    AppHeader,
    HomeHeader,
  },
  watch: {
    $route(to, from) {
      this.showHomeHeader = to.name === "Home"
    },
  },
};
</script>
