import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Проверяем наличие токена
  const token = localStorage.getItem('token')
  if (token && !store.state.user) {
    try {
      // Если есть токен, но нет пользователя в хранилище - загружаем
      await store.dispatch('getCurrentUser')
    } catch {
      // Если токен невалидный - очищаем
      localStorage.removeItem('token')
    }
  }

  if (to.meta.requiresAuth && !store.state.user) {
    next('/auth?redirect=' + encodeURIComponent(to.fullPath))
  } else {
    next()
  }
})

export default router