<!-- src/pages/RegisterPage.vue -->
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
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow rounded-xl">
      <h2 class="mb-6 text-2xl font-bold text-center">Create an Account</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block mb-1 font-medium">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 text-white transition bg-black rounded hover:bg-gray-800 rounded-xl"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-sm text-center">
        Already have an account?
        <RouterLink to="/login" class="text-blue-600 hover:underline">
          Login here
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const register = () => {
 
  localStorage.setItem("user", JSON.stringify({ name: name.value, email: email.value }));

 
  router.push("/");
};
</script>
