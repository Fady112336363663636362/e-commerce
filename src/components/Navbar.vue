<template>
  <header class="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
    <div class="container flex items-center justify-between px-4 py-4 mx-auto">
      <!-- Logo -->
      <RouterLink to="/#home" class="text-3xl font-black text-gray-900">
        SHOP.COM
      </RouterLink>

      <!-- Search Input -->
      <div class="hidden w-1/3 md:block">
        <input
          type="text"
          v-model="searchStore.query"
          placeholder="Search products..."
          class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/stores/search";
const searchStore = useSearchStore();

const router = useRouter();
const route = useRoute();

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Scroll to section by ID
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// Navigate to home then scroll
const goAndScroll = (id) => {
  if (route.path !== "/") {
    router.push(`/#${id}`);
  } else {
    scrollToSection(id);
  }
  closeMobileMenu();
};

// Scroll to footer specifically
const scrollToFooter = () => {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.scrollIntoView({ behavior: "smooth" });
  }
  closeMobileMenu();
};

onMounted(() => {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace("#", "");
    setTimeout(() => {
      scrollToSection(id);
    }, 300);
  }
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.nav-link {
  @apply text-gray-600 hover:text-black transition duration-200 relative;
}

.nav-link::after {
  content: "";
  @apply absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300;
}

.nav-link:hover::after {
  @apply w-full;
}
</style>
