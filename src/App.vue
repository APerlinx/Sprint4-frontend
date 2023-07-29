<template>
  <AppHeader />
  <RouterView />
  <UserMsg />
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import UserMsg from "./cmps/UserMsg.vue";
import AppHeader from "./cmps/AppHeader.vue";

export default {
  created() {
    console.log("Vue App created");

    this.$store.dispatch({ type: "loadBoards" });

    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    UserMsg,
    AppHeader
  },
};
</script>
