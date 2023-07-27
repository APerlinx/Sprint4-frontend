<template>
  <header class="board-header">
    <nav class="nav-bar">
      <input
        type="text"
        placeholder="Hello Trello"
        v-model="boardTitle"
      />
    </nav>
  </header>
</template>

<script>

export default {
  data() {
    return {
      boardTitle: 'Hello Trello!', 
    };
  },
};
</script>

<style>
input:focus {
  outline: none;
}
</style>
