import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/coin/:id',
      name: 'coin-detail',
      component: () => import('@/views/CoinDetailView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: () => import('@/views/ErrorView.vue')
    }
  ]
})

export default router
