<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart"; // ✅ استدعاء واحد فقط
import { useToast } from "@/components/ui/toast";

const cartStore = useCartStore(); // ✅ استخدامه مره واحدة

const allProducts = ref([]);
const visibleProducts = ref([]);
const isExpanded = ref(false);

const categories = [
  "womens-dresses",
  "mens-shirts",
  "tops",
  "womens-shoes",
  "mens-shoes",
];

const fetchProducts = async () => {
  const results = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      return data.products;
    })
  );

  const merged = results.flat();
  allProducts.value = merged;
  visibleProducts.value = merged.slice(0, 8);
};

const toggleShow = () => {
  isExpanded.value = !isExpanded.value;
  visibleProducts.value = isExpanded.value
    ? allProducts.value
    : allProducts.value.slice(0, 8);
};

const { toast } = useToast();

const handleAddToCart = (product) => {
  cartStore.addToCart(product);
  toast({
    title: "✅ Added!",
    description: `${product.title} Product was added to your shopping cart.`,
    duration: 2000,
    class: "bg-white text-black border border-gray-300 shadow-lg",
  });
};
onMounted(fetchProducts);
</script>

<template>
  <section id="favorites" class="px-4 py-12 mx-auto bg-white max-w-7xl">
    <h2 class="mb-10 text-4xl font-bold text-center text-gray-900">
      New Arrivals
    </h2>

    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        class="rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] animate-fadeIn"
      >
        <!-- الصورة واللينك -->
        <router-link :to="`/product/${product.id}`">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="object-cover w-full h-60"
          />
        </router-link>

        <!-- باقي التفاصيل -->
        <div class="flex flex-col gap-2 p-4">
          <h3 class="text-base font-semibold text-gray-800 truncate">
            {{ product.title }}
          </h3>
          <p class="h-10 text-xs text-gray-500 line-clamp-2">
            {{ product.description }}
          </p>

          <div class="flex items-center text-sm text-yellow-400">
            <span v-for="i in 5" :key="i">
              <span v-if="i <= Math.round(product.rating)">★</span>
              <span v-else class="text-gray-300">☆</span>
            </span>
            <span class="ml-1 text-xs text-gray-500"
              >({{ product.rating.toFixed(1) }})</span
            >
          </div>

          <!-- السعر وزر السلة -->
          <div class="flex items-center justify-between mt-2">
            <span class="text-sm font-bold text-primary"
              >${{ product.price }}</span
            >
            <button
              @click.stop="handleAddToCart(product)"
              class="p-2 transition rounded-full hover:bg-gray-200"
              title="Add to cart"
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center">
      <button
        @click="toggleShow"
        class="px-6 py-2 text-sm text-white transition bg-black rounded-full hover:bg-gray-800"
      >
        {{ isExpanded ? "Show Less" : "Show More" }}
      </button>
    </div>
  </section>
</template>

<style scoped>
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
