<template>
  <section class="board-container">
    <div class="recently">
      <h2 class="title">Recently viewed</h2>
      <BoardList
      :boards="boards"
      /> 
    </div>

    <h3>YOUR WORKSPACE</h3>
    <div class="your">
      <h2 class="title">Your boards</h2>
      <BoardList
      :boards="boards"
      /> 
    </div>

    <div class="stared">
      <h2 class="title">stared</h2>
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
