import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import BoardDetails from './views/BoardDetails.vue'
import BoardIndex from './views/BoardIndex.vue'
// import ReviewIndex from './views/ReviewIndex.vue'
import TaskDetails from './views/TaskDetails.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:boardId?',
    name: 'BoardDetails',
    component: BoardDetails,
    children: [
      {
        path: '/:taskId',
        component: TaskDetails,
      },
    ]
  },
  {
    path: '/board',
    name: 'BoardIndex',
    component: BoardIndex,
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: TaskDetails //check for now
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})


