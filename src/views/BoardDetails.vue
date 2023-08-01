<template>
  <section class="board-details" v-if="board" :style="board.style">
    <BoardHeader :board="board" />
    <GroupList v-if="board.groups" :groups="board.groups" :key="board.groups" />
    <RouterView />
  </section>
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import BoardHeader from '../cmps/BoardHeader.vue'

export default {
  components: { GroupList, BoardHeader },
  data() {
    return {
      boardStyle: {
      backgroundImage: '',
      backgroundColor: '',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    }
  },
  async created() {
    await this.$store.dispatch('loadBoards')
    const { boardId } = this.$route.params
    await this.$store.dispatch('loadCurrentBoard', { boardId })
    await this.$store.dispatch('addBoardToRecent', { boardId })
  },
  computed: {
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
    },
  },
  watch: {
  'board.style': {
    deep: true,
    handler(newVal) {
      this.boardStyle = {
        backgroundImage: newVal.backgroundImage ? `url(${newVal.backgroundImage})` : '',
        backgroundColor: newVal.backgroundColor || '',
         backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      };
    },
  },
},
}
</script>
