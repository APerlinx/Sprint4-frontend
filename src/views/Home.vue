<template>
  <section class="board-index-container">
    <h2>My Boards</h2>
    <h2>Recently viewed</h2>
    <h2>Stared</h2>
    <router-link to='/b'>board1</router-link>
    <router-link to='/b'>board2</router-link>
    <router-link to='/b'>board3</router-link>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
  
}
</script>
