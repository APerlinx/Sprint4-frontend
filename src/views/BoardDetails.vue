<template>
  <section class="board-details" v-if="!isLoadingBoard && board" :style="this.boardStyle">
    <BoardHeader :board="board" @searchTermChanged="handleSearchTermChange"
      @checkboxChanged="handleCheckboxChangeEvent" />
    <GroupList v-if="boardsLoaded && groups && groups.length > 0" :initialGroups="groups" :key="groups" />
    <RouterView />
  </section>
  <div v-if="isLoadingBoard">Loading...</div>
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
      searchTerm: '',
      checkboxValues: {
        noDate: false,
        overdue: false,
        dueInNextDay: false,
      },
      boardsLoaded: false,
    }
  },
  async created() {
    this.loadBoardData()
  },

  computed: {
    isLoadingBoard() {
      return this.$store.getters.isLoadingBoard
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
    },
    groups() {
      const { boardId } = this.$route.params
      const newGroups = this.$store.getters.getFilteredGroups(
        this.checkboxValues,
        boardId
      )
<<<<<<< HEAD
      // console.log('newGroups', newGroups)
=======
>>>>>>> 747f8cba385a628572b19f99491f1c775cf0c147
      return newGroups
    },
  },
  methods: {
    async loadBoardData() {
      const { boardId } = this.$route.params
      await this.$store.dispatch('loadCurrentBoard', { boardId })
      await this.$store.dispatch('addBoardToRecent', { boardId })
      this.boardsLoaded = true 
    },
    handleSearchTermChange(searchTerm) {
      this.searchTerm = searchTerm
    },
    handleCheckboxChangeEvent(checkboxEvent) {
      this.checkboxValues[checkboxEvent.name] = checkboxEvent.value
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
<<<<<<< HEAD
    groups(newGroups, oldGroups) {
      // console.log('groups updated in GroupList')
      // console.log('newGroups: ', newGroups)
      // console.log('oldGroups: ', oldGroups)
    },
=======
>>>>>>> 747f8cba385a628572b19f99491f1c775cf0c147
    '$route.params.boardId': {
      immediate: true, 
      handler: 'loadBoardData',
    },
  },
}
</script>
