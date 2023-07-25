<template>
  <div class="board">
    <RouterLink :to="'/details/' + board._id"> 
      <h2>{{ board.title }}</h2>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: ["board"],

  data() {
    return {};
  },
};
</script>

<style></style>
