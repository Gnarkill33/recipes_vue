import HomePage from '@/pages/HomePage.vue'
import CategoriesPage from '@/pages/CategoriesPage.vue'
import { ROUTES } from '@/constants'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: HomePage,
    },
    {
      path: ROUTES.CATEGORIES,
      name: 'categories',
      component: CategoriesPage,
    },
  ],
})

export default router
