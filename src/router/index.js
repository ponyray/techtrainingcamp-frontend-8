import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Studio from '../views/Studio.vue'
import ShortVideo from '../views/ShortVideo.vue'
import Comment from '../views/Comment.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
      path: '/', 
      name: 'Studio',
      component: Studio
  },
  {
      path: '/shortvideo', 
      name: 'ShortVideo',
      component: ShortVideo
  },
  {
      path: '/comment', 
      name: 'Comment',
      component: Comment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
