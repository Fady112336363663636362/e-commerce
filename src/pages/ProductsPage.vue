<template>
  <Navbar />
  <div class="flex flex-col gap-6 p-6 md:flex-row">
    <aside
      class="w-full p-4 space-y-6 bg-white border rounded-2xl shadow-m md:w-64"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Filters</h2>
        <span class="text-xl">⚙️</span>
      </div>

      <hr />

      <ul class="space-y-3 text-sm">
        <li>
          <button
            @click="selectedCategory = null"
            class="flex items-center justify-between w-full font-semibold text-left text-gray-700 hover:text-black"
          >
            All Products
          </button>
        </li>
        <li v-for="category in categories" :key="category">
          <button
            @click="filterByCategory(category)"
            class="flex items-center justify-between w-full text-left text-gray-700 hover:text-black"
          >
            {{ formatCategory(category) }}
            <span>›</span>
          </button>
        </li>
      </ul>

      <hr />

      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Price Range</label>
        <input
          type="range"
          min="0"
          :max="maxPriceLimit"
          v-model="selectedPrice"
          class="w-full"
        />
        <div class="flex justify-between text-sm text-gray-600">
          <span>$0</span>
          <span>${{ selectedPrice }}</span>
        </div>
      </div>
    </aside>

    <div
      class="grid w-full grid-cols-1 gap-6 rounded-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="p-4 transition border shadow-sm rounded-2xl hover:shadow-lg"
      >
        <RouterLink :to="`/product/${product.id}`">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="object-cover w-full h-48 rounded-2xl"
          />
          <h3 class="mt-2 text-lg font-semibold">{{ product.title }}</h3>
          <p class="text-sm text-gray-500">{{ product.category }}</p>
          <p class="mt-1 font-bold text-black">${{ product.price }}</p>
        </RouterLink>

        <div class="flex gap-2 mt-3">
          <button
            @click.stop="handleAddToCart(product)"
            class="p-2 transition rounded-full hover:bg-gray-200"
            title="Add to cart"
          >
            🛒
          </button>
          <button
            class="w-full px-3 py-1 text-sm font-medium text-white bg-black border rounded-xl hover:bg-slate-400"
            @click="openQuickView(product)"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="quickViewProduct"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="p-6 bg-white rounded-lg w-[90%] max-w-lg shadow-xl">
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-semibold">{{ quickViewProduct.title }}</h2>
        <button @click="quickViewProduct = null" class="text-lg">✖</button>
      </div>
      <img
        :src="quickViewProduct.thumbnail"
        :alt="quickViewProduct.title"
        class="object-cover w-full h-64 rounded"
      />
      <p class="mt-4 text-gray-700">{{ quickViewProduct.description }}</p>
      <p class="mt-2 text-lg font-bold">${{ quickViewProduct.price }}</p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast";
import { useCartStore } from "@/stores/cart";
import { useSearchStore } from "@/stores/search";

const categories = [
  "laptops",
  "fragrances",
  "groceries",
  "home-decoration",
  "furniture",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
];

const searchStore = useSearchStore();
const allProducts = ref([]);
const selectedCategory = ref(null);
const selectedPrice = ref(1000);
const maxPriceLimit = ref(1000);
const quickViewProduct = ref(null);
const cartStore = useCartStore();
const { toast } = useToast();

const router = useRouter();

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  allProducts.value = data.products;
};

const handleAddToCart = (product) => {
  cartStore.addToCart(product);
  toast({
    title: "✅ Added!",
    description: `${product.title} was added to your shopping cart.`,
    duration: 2000,
    class: "bg-white text-black border border-gray-300 shadow-lg",
  });
};

onMounted(fetchProducts);

// Filters
const filteredProducts = computed(() =>
  allProducts.value.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchStore.query.toLowerCase());

    const matchesCategory =
      !selectedCategory.value || product.category === selectedCategory.value;

    const matchesPrice = product.price <= selectedPrice.value;

    return matchesSearch && matchesCategory && matchesPrice;
  })
);

const filterByCategory = (cat) => {
  selectedCategory.value = cat.toLowerCase();
};

const formatCategory = (cat) => {
  return cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ");
};

const addToCart = (product) => {
  console.log("Added to cart:", product.title);
};

const openQuickView = (product) => {
  quickViewProduct.value = product;
};
</script>

<style scoped>
button {
  @apply transition duration-200;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-in-out;
}
.text-primary {
  color: hsl(var(--primary));
}
</style>
