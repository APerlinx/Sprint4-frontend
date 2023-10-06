<template>
  <section
    class="board-details"
    v-if="!isLoadingBoard && board"
    :style="this.boardStyle"
  >
        <div class="sidebar-toggle" @click="toggleSidebar">
        <svg
          width="26"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.294 9.69805C10.2008 9.60614 10.1268 9.49661 10.0763 9.37584C10.0258 9.25507 9.99976 9.12546 9.99976 8.99455C9.99976 8.86364 10.0258 8.73403 10.0763 8.61327C10.1268 8.4925 10.2008 8.38297 10.294 8.29105C10.4831 8.10449 10.738 7.99988 11.0035 7.99988C11.2691 7.99988 11.524 8.10449 11.713 8.29105L14.678 11.2311C14.7802 11.3324 14.8614 11.453 14.9167 11.5858C14.9721 11.7186 15.0006 11.8611 15.0006 12.0051C15.0006 12.149 14.9721 12.2915 14.9167 12.4243C14.8614 12.5572 14.7802 12.6777 14.678 12.7791L11.723 15.7091C11.534 15.8959 11.2789 16.0007 11.013 16.0007C10.7472 16.0007 10.4921 15.8959 10.303 15.7091C10.2098 15.6171 10.1358 15.5076 10.0853 15.3868C10.0348 15.2661 10.0088 15.1365 10.0088 15.0056C10.0088 14.8746 10.0348 14.745 10.0853 14.6243C10.1358 14.5035 10.2098 14.394 10.303 14.3021L12.621 12.0051L10.294 9.69805V9.69805Z"
            class="ghly4t0Xcm0PLQ"
          ></path>
        </svg>
      </div>

    <div class="sidebar" :class="{ 'show-sidebar': showSidebar }">

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
      this.showSidebar = !this.showSidebar
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
      // await this.$store.commit('addBoardToRecent', { boardId })
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
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh'
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
