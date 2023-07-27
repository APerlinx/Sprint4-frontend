<template>
  <div class="container home">
    <h2>Reviews</h2>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ul class="review-list">
      <li v-for="review in reviews" :key="review._id">
        <p>
          About
          <RouterLink :to="`user/${review.aboutUser._id}`">
            {{review.aboutUser.fullname}}
          </RouterLink> 
        </p>
        <pre>{{review.txt}}</pre>
        <p>By 
          <RouterLink :to="`user/${review.byUser._id}`">
            {{review.byUser.fullname}}
          </RouterLink>
        </p>
      </li>
    </ul>
    <hr />
    <form v-if="loggedInUser" @submit.prevent="addReview()">
      <h2>Your gossip:</h2>
      <select v-model="reviewToEdit.aboutUserId">
        <option v-for="user in users" :key="user._id" :value="user._id" >
          {{user.fullname}}
        </option>
      </select>
      <textarea placeholder="Your Opinion Matters..." v-model="reviewToEdit.txt"></textarea>
      <button>Save</button>
    </form>
  </div>
</template>

<script>

import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'
import { reviewService } from '../services/review.service.local'

export default {
  data() {
    return {
      reviewToEdit: reviewService.getEmptyReview()
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews
    },
    users() {
      return this.$store.getters.usersExcludeMe
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
  created() {
    this.$store.dispatch({type: 'loadUsers'})
    this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    async addReview() {
      try {
        await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
        showSuccessMsg('Review added')
        this.reviewToEdit = reviewService.getEmptyReview()
      } catch(err) {
        showErrorMsg('Cannot add review')
      }
    }
  }

  
}
</script>
