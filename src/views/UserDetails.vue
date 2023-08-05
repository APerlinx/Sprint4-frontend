<template>
  <section v-if="user">
    <h1>User Details - {{ user.fullname }}</h1>
    <h2 v-if="isMe">Its me</h2>
    <h3>{{ user.username }} score: {{ user.score }}</h3>
    <img style="max-width: 200px;" :src="user.imgUrl" />
    <ul>
      <li v-for="review in user.givenReviews" :key="review._id">
        {{ review.txt }}
        <RouterLink :to="`/user/${review.aboutUser._id}`">
          About {{ review.aboutUser.fullname }}
        </RouterLink>
      </li>
    </ul>

    <details>
      <summary>Full JSON</summary>
      <!-- <pre>{{ user }}</pre> -->
    </details>
  </section>
</template>

<script>
// import { SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED, socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service.local'

export default {
  data() {
    return {
      user: null
    }
  },
  watch: {
    userId: {
      handler() {
        this.loadUser()
      },
      immediate: true,
    },
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    isMe() {
      return this.userId === this.$store.getters.loggedinUser._id
    },
  },
  methods: {
    async loadUser() {
      if (!this.userId) return
      try {
        const user = await userService.getById(this.userId)
        // socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        
        // socketService.emit(SOCKET_EMIT_USER_WATCH, this.userId)
        // socketService.on(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        this.user = user
      } catch(err) {
        showErrorMsg('Cannot load user: ' + this.userId)
        console.error('Failed to load user', err)
      }
    },
    onUserUpdate(updatedUser) {
      showSuccessMsg(`This user ${updatedUser.fullname} just got updated from socket,
       new score: ${updatedUser.score}`)
      this.user = updatedUser
    },
    unmounted() {
      // socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
    },
  }
}
</script>