<template>
  <section class="board-details">
    <BoardHeader />
    <GroupList />
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

    }
  },
  async created() {
    await this.$store.dispatch('loadBoards')
    const boardId = this.$route.params.boardId
    await this.$store.dispatch('loadCurrentBoard', { boardId })
  },
  methods: {},
}
</script>
