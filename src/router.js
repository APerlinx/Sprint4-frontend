import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import BoardDetails from './views/BoardDetails.vue'
import BoardIndex from './views/BoardIndex.vue'
import TaskDetails from './views/TaskDetails.vue'
import LoginSignup from './views/LoginSignup.vue'
// import UserDetails from './views/UserDetails.vue'

const routes = [
  {
    path: '/board',
    name: 'BoardIndex',
    component: BoardIndex,
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:boardId',
    name: 'BoardDetails',
    component: BoardDetails,
    children: [
      {
        path: 'group/:groupId/task/:taskId',
        component: TaskDetails,
      },
    ],
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})


