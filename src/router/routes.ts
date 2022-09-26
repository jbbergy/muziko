import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/home/home.vue'

const routes = [
  { path: '/', component: Home },
]

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
