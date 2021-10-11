import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'user',
        name: 'uer',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/user.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
