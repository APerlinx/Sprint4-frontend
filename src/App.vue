<template>
  <section>
    <AppHeader />
    <div class="main-layout">
      <RouterView />
    </div>
    <UserMsg />
  </section>
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/AppHeader.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  created() {
    console.log("Vue App created");

    this.$store.dispatch({ type: "loadBoards" });

    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    AppHeader,
    UserMsg,
  },
};
</script>
