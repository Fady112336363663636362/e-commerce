<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useToast } from "@/components/ui/toast";

const cartStore = useCartStore();
const { toast } = useToast();
const router = useRouter();

const allTopProducts = ref([]);
const visibleProducts = ref([]);
const showLimit = ref(8);
const maxLimit = 20;
const initialLimit = 8;

const fetchTopSelling = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();

  const filtered = data.products.filter((product) =>
    ["smartphones", "watches", "laptops", "fragrances"].includes(
      product.category
    )
  );

  allTopProducts.value = filtered.slice(0, maxLimit);
  visibleProducts.value = allTopProducts.value.slice(0, showLimit.value);
};

const showMore = () => {
  showLimit.value = Math.min(showLimit.value + 8, maxLimit);
  visibleProducts.value = allTopProducts.value.slice(0, showLimit.value);
};

const showLess = () => {
  showLimit.value = initialLimit;
  visibleProducts.value = allTopProducts.value.slice(0, showLimit.value);
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

onMounted(fetchTopSelling);
</script>

<template>
  <section id="top-selling" class="px-4 py-10 mx-auto bg-white max-w-7xl">
    <h2 class="mb-6 text-4xl font-bold text-center">Top Selling</h2>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        class="block rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02] animate-fadeIn"
      >
        <div @click="router.push(`/product/${product.id}`)" class="cursor-pointer">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="object-cover w-full h-60"
          />
        </div>

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
            <span class="ml-1 text-xs text-gray-500">
              ({{ product.rating.toFixed(1) }})
            </span>
          </div>

          <div class="flex items-center justify-between mt-2">
            <span class="text-sm font-bold text-primary">
              ${{ product.price }}
            </span>
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

    <div class="flex flex-col items-center gap-3 mt-8 text-center">
      <button
        v-if="visibleProducts.length < allTopProducts.length"
        @click="showMore"
        class="px-6 py-2 text-sm text-white bg-black rounded rounded-full hover:bg-gray-800"
      >
        Show More
      </button>

      <button
        v-if="visibleProducts.length > initialLimit"
        @click="showLess"
         class="px-6 py-2 text-sm text-white transition bg-black rounded-full hover:bg-gray-800"
      >
        Show Less
      </button>
    </div>
  </section>
</template>

<style scoped>
.text-primary {
  color: hsl(var(--primary));
}
.bg-primary {
  background-color: hsl(var(--primary));
}
</style>
