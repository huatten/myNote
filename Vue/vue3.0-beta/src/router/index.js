import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    title: "目录"
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue'),
    title: "认识Composition API"
  },
  {
    path: '/pullupLoad',
    name: 'PullupLoad',
    component: () => import(/* webpackChunkName: "pullupLoad" */ '../views/PullupLoad.vue'),
    title: "Composition API实战-上拉加载"
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
