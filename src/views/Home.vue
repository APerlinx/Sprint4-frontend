<template>
  
  <section class="board-index-container">
    <div class="my-boards">
      <h2>My Boards</h2>
      <router-link to="/b">board1</router-link>
    </div>

    <div class="recently">
      <h2>Recently viewed</h2>
      <router-link to="/b">board2</router-link>
    </div>

    <div class="stared">
      <h2>Stared</h2>
      <router-link to="/b">board3</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
