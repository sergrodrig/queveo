import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetail',
    component: () => import(/* webpackChunkName: "home" */ '../views/Movie.vue')
  },
  {
    path: '/tv/:movieId',
    name: 'ShowDetail',
    component: () => import(/* webpackChunkName: "home" */ '../views/Show.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
