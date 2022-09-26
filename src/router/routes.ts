import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/home-page/home-page.vue'

const routes = [
  { path: '/', component: HomePage },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
