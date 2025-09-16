<template>
<header class="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
    <div class="container flex items-center justify-between px-4 py-4 mx-auto">
      <!-- Logo -->
      <RouterLink to="/#home" class="text-3xl font-black text-gray-900">
        SHOP.COM
      </RouterLink>

      

      <!-- Desktop Links -->
      <nav class="items-center hidden gap-6 font-ml medium text- md:flex">
        <a @click.prevent="goAndScroll('home')" class="cursor-pointer nav-link"
          >Home</a
        >
        <a
          @click.prevent="goAndScroll('favorites')"
          class="cursor-pointer nav-link"
          >Favorites</a
        >
        <a
          @click.prevent="goAndScroll('top-selling')"
          class="cursor-pointer nav-link"
          >Top Selling</a
        >
        <a @click.prevent="goAndScroll('footer')" class="cursor-pointer nav-link">
          Contact us
        </a>

        <RouterLink to="/cart" class="nav-link" @click="closeMobileMenu"
          >🛒 </RouterLink
        >

        <RouterLink to="/Login" class="text-xl nav-link">👤</RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="text-2xl md:hidden">☰</button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="px-4 pb-4 md:hidden">
      <div class="flex flex-col gap-3 text-sm font-medium">
        <a @click.prevent="goAndScroll('home')" class="cursor-pointer nav-link"
          >Home</a
        >
        <a
          @click.prevent="goAndScroll('favorites')"
          class="cursor-pointer nav-link"
          >Favorites</a
        >
        <a
          @click.prevent="goAndScroll('top-selling')"
          class="cursor-pointer nav-link"
          >Top Selling</a
        >
        <a
          @click.prevent="goAndScroll('footer')"
          class="cursor-pointer nav-link"
        >
          Contact us
        </a>

        <RouterLink to="/cart" class="nav-link" @click="closeMobileMenu"
          >🛒</RouterLink
        >
         <RouterLink to="/Login" class="text-xl nav-link">👤</RouterLink>
      </div>
    </div>
  </header>
  
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div class="w-full max-w-xl p-8 space-y-6 bg-white shadow rounded-xl">
      <h2 class="text-2xl font-bold text-center">Login to your account</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-3 py-2 mt-1 border rounded-xl"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-3 py-2 mt-1 border rounded-xl"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-center text-red-500">
          {{ errorMessage }}
        </p>

        <button @click="handleLogin"
          type="submit"
          class="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-800 rounded-xl"
        >
          Login
        </button>
        <p class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="text-blue-600 hover:underline">
            Register here
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  if (email.value && password.value) {
    localStorage.setItem('userEmail', email.value)

    const redirectTo = route.query.redirect || '/'
    router.push(redirectTo)
  } else {
    errorMessage.value = 'Please enter valid credentials'
  }
}
</script>

