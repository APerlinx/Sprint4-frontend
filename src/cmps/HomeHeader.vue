<template>
  <div class="home-header">
    <div class="logo">
      <span class="trello"><img src="../assets/styles/img/trello-icon.svg" alt=""></span>
      <h5>Trio</h5>
    </div>

    <div class="user-section">
      <router-link :to="'./login'" >
        <div class="btn-header">Log in</div>
      </router-link>
      <div class="btn-header">Get Trio for free</div>
    </div>
  </div>

</template>
<script>
export default {};
</script>
