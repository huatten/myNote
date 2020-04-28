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

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
