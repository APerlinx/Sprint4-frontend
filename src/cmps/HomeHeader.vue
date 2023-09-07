<template>
  <div class="home-header">
    <div class="logo">
      <span class="trello"><img src="../assets/styles/img/trello-icon.svg" alt="Trio"></span>
      <h5>Trio</h5>
      <Transition>
        <i v-if="!isNavOpen" @click="isNavOpen = true" class="fa-solid fa-bars" style="color: #182b4d;"></i>
      </Transition>
      <i v-if="isNavOpen" @click="isNavOpen = false" class="fa-solid fa-x"></i>
    </div>

    <div class="user-section">
      <router-link :to="'./login'">
        <div class="btn-header">Log in</div>
      </router-link>
      <div class="btn-header">Get Trio for free</div>
    </div>

    <div class="mobile-menu" :class="{ 'open': isNavOpen }">
      <div class="btn-get">Get Trio for free</div>
      <router-link :to="'./login'">
        <div class="btn-login">Login</div>
      </router-link>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isNavOpen: false
    };
  },
};
</script>
