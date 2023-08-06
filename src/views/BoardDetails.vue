<template>
  <section
    class="board-details"
    v-if="!isLoadingBoard && board"
    :style="this.boardStyle"
  >

      <div class="sidebar" :class="{ 'show-sidebar': showSidebar }">
      <span class="sidebar-close-btn" @click="toggleSidebar">×</span>
      <!-- Add content to your sidebar here -->
    </div>

    <BoardHeader
      :board="board"
      @searchTermChanged="handleSearchTermChange"
      @checkboxChanged="handleCheckboxChangeEvent"
    />
    <GroupList
      v-if="boardsLoaded && groups && groups.length > 0"
      :initialGroups="groups"
      :key="groups"
    />
    <RouterView />

  </section>

  <div v-if="isLoadingBoard"><Loader /></div>
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import BoardHeader from '../cmps/BoardHeader.vue'
import Loader from '../cmps/Loader.vue'

import {
  socketService,
  SOCKET_EMIT_SET_TOPIC,
} from '../services/socket.service.js'

export default {
  emits: ['changeHeaderClr'],
  components: { GroupList, BoardHeader, Loader },
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
          showSidebar: false,

    }
  },
  async created() {
    this.loadBoardData()
    socketService.on('on-board-update', (board) =>
      this.$store.commit({ type: 'updateBoard', board })
    )
    this.$store.commit('setChangeClr', true)
  },
  computed: {
      toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  },
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
      return newGroups
    },
  },
  methods: {
    async loadBoardData() {
      const { boardId } = this.$route.params
      await this.$store.dispatch('loadCurrentBoard', { boardId })
      await this.$store.dispatch('addBoardToRecent', { boardId })
      this.boardsLoaded = true
      socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
    },
    handleSearchTermChange(searchTerm) {
      this.searchTerm = searchTerm
    },
    handleCheckboxChangeEvent(checkboxEvent) {
      this.checkboxValues[checkboxEvent.name] = checkboxEvent.value
    },
  },
  unmounted() {},
  watch: {
    'board.style': {
      deep: true,
      handler(newVal) {
        this.boardStyle = {
          backgroundImage: newVal.backgroundImage || '',
          backgroundColor: newVal.backgroundColor || '',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'cover',
        }
      },
    },
    '$route.params.boardId': {
      immediate: true,
      handler: 'loadBoardData',
    },
  },
}
</script>
