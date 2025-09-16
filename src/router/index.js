import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import ProductDetails from '@/pages/ProductDetails.vue'
import ProductsPage from "@/pages/ProductsPage.vue";
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import CartPage from '@/pages/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/products',
    component: ProductsPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userEmail')

  if (to.meta.requiresAuth && !isAuthenticated) {

    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
