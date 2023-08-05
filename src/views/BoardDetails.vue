<template>
  <section class="board-details" v-if="board" :style="this.boardStyle">
    <BoardHeader :board="board" />
    <GroupList v-if="board.groups" :groups="board.groups" :key="board.groups" />
    <RouterView />
  </section>
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import BoardHeader from '../cmps/BoardHeader.vue'
import {
  socketService,
  SOCKET_EMIT_SET_TOPIC,
} from '../services/socket.service.js'

export default {
  components: { GroupList, BoardHeader },
  data() {
    return {
      boardStyle: {
        backgroundImage: '',
        backgroundColor: '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    }
  },
  async created() {
    await this.$store.dispatch('loadBoards')
    const { boardId } = this.$route.params
    await this.$store.dispatch('loadCurrentBoard', { boardId })
    await this.$store.dispatch('addBoardToRecent', { boardId })
    socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
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
          backgroundImage: newVal.backgroundImage || '',
          backgroundColor: newVal.backgroundColor || '',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }
      },
    },
  },
}
</script>
