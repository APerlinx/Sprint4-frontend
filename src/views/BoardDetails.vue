<template>
  <section class="board-details" v-if="board">
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
    return {}
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
      // return JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
    },
  },
}
</script>
