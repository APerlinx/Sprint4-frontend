<template>
  <div>
    <HomeHeader v-if="showHomeHeader" />
    <AppHeader v-else />
    <RouterView />
  </div>
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/AppHeader.vue";
import HomeHeader from "./cmps/HomeHeader.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadBoards" });
    this.$store.dispatch({ type: "loadUsers" });
    // this.$store.dispatch({
    //   type: "login",
    //   userCred: { username: "Shayzig", password: "123" },
    // });

    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
    socketService.on("on-notifcation-push", this.addNotifcation);
  },

  data() {
    return {
      showHomeHeader: true,
    };
  },

  methods: {
    addNotifcation({ notification }) {
      this.$store.dispatch({ type: "addNotifcation", notification });
    },
  },

  components: {
    AppHeader,
    HomeHeader,
  },

  watch: {
    $route(to, from) {
      this.showHomeHeader = to.name === "Home";
    },
  },
};
</script>
