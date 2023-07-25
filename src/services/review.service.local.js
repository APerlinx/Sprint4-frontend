import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import {userService} from './user.service.local'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'


;(() => {
  setTimeout(()=>{
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      console.log('GOT from socket', review)
      store.commit({type: 'addReview', review})
    })
    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })
  }, 0)

})()



export const reviewService = {
  add,
  query,
  remove,
  getEmptyReview
}



function query(filterBy) {
  return storageService.query('review')
}

async function remove(reviewId) {
  await storageService.delete('review', reviewId)

}

async function add({txt, aboutUserId}) {
  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getEmptyReview() {
  return {
    txt: '',
    aboutUserId: null
  }
}