<template>
  <section class="board-details">
    <BoardHeader />
    <GroupList />
  </section>
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import BoardHeader from '../cmps/BoardHeader.vue'
export default {
  components: { GroupList, BoardHeader },
  data() {
    return {
      boards: null,
    }
  },
  async created() {
    await this.$store.dispatch('loadBoards')
  },
  methods: {},
  async beforeRouteEnter(to, from, next) {
    const boardId = to.params.boardId
    try {
      await next((vm) => {
        return vm.$store.dispatch({ type: 'loadCurrentBoard', boardId })
      })
    } catch (err) {
      console.error(err)
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const boardId = to.params.boardId
    try {
      await this.$store.dispatch({ type: 'loadCurrentBoard', boardId })
      next()
    } catch (err) {
      console.error(err)
    }
  },
}
</script>
