<template>
  <section class="board-index-container">
    <div class="my-boards">
      <h2>My Boards</h2>
      <BoardList
      :boards="boards"
      /> 
    </div>
  </section>
</template>

<script>
import BoardList from '../cmps/BoardList.vue'

export default {
  data() {
    return {
    }
  },

  created() {
  },

  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  components:{
    BoardList
  }
};
</script>
