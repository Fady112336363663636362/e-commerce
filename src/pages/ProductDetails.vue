<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductTabs from "@/components/ProductTabs.vue";
import { toast } from "@/components/ui/toast";

import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";

const route = useRoute();
const productId = route.params.id;

const product = ref(null);
const isLoading = ref(true);
const selectedColor = ref(null);
const selectedSize = ref(null);
const quantity = ref(1);
const mainImage = ref("");

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";




const showDialog = ref(false);
const name = ref("");
const email = ref("");
const address = ref("");
const paymentMethod = ref("credit");

const confirmOrder = () => {
  alert(
    `Order confirmed for ${name.value}, will be shipped to ${address.value}, paid via ${paymentMethod.value}`
  );
  showDialog.value = false;
};

const colors = ["#000000", "#ffffff", "#FF5733", "#3498db", "#2ecc71"];
const sizes = ["S", "M", "L", "XL"];

const cartStore = useCartStore();

const handleAddToCart = (product) => {
  cartStore.addToCart(product);
  toast({
    title: "✅ Added!",
    description: `${product.title} Product was added to your shopping cart.`,
    duration: 2000,
  });
};

const fetchProductDetails = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    product.value = data;
    mainImage.value = data.thumbnail;
  } catch (error) {
    console.error("Error loading product:", error);
  } finally {
    isLoading.value = false;
  }
};

const changeMainImage = (img) => {
  mainImage.value = img;
};

onMounted(fetchProductDetails);
</script>

<template>
  <Navbar />
  <section class="px-6 py-10 mx-auto max-w-7xl">
    <div v-if="isLoading" class="text-lg text-center text-gray-500">
      Loading...
    </div>

    <div v-else-if="product" class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <img
          :src="mainImage"
          :alt="product.title"
          class="shadow-md rounded-xl w-full h-[400px] object-cover transition duration-300"
        />
        <div class="grid grid-cols-4 gap-2 mt-4">
          <img
            v-for="(img, i) in product.images.slice(0, 4)"
            :key="i"
            :src="img"
            @click="changeMainImage(img)"
            class="object-cover w-full h-20 transition rounded cursor-pointer hover:opacity-80"
            :class="{ 'ring-2 ring-black': img === mainImage }"
          />
        </div>
      </div>

      <div class="space-y-5">
        <h1 class="text-3xl font-bold text-gray-800">{{ product.title }}</h1>

        <div class="flex items-center gap-2">
          <span class="text-lg text-yellow-400">
            <span v-for="i in 5" :key="i">
              <span v-if="i <= Math.round(product.rating)">★</span>
              <span v-else class="text-gray-300">☆</span>
            </span>
          </span>
          <span class="text-sm text-gray-500"
            >({{ product.rating.toFixed(1) }})</span
          >
        </div>
        <hr />
        <p class="text-base leading-relaxed text-gray-600">
          {{ product.description }}
        </p>
        <div class="text-2xl font-bold text-primary">${{ product.price }}</div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-600">Color</label>
          <div class="flex gap-3">
            <div
              v-for="color in colors"
              :key="color"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
              class="w-6 h-6 border rounded-full cursor-pointer"
              :class="selectedColor === color ? 'ring-2 ring-black' : ''"
            ></div>
          </div>
        </div>
        <hr />

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-600">Size</label>
          <div class="flex gap-2">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectedSize = size"
              class="px-3 py-1 text-sm border rounded-md"
              :class="
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700'
              "
            >
              {{ size }}
            </button>
          </div>
        </div>
        <hr />

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-600"
            >Quantity</label
          >
          <div class="flex items-center gap-2">
            <button
              @click="quantity = Math.max(1, quantity - 1)"
              class="w-8 h-8 text-lg bg-gray-200 rounded-full"
            >
              -
            </button>
            <span class="text-lg font-medium">{{ quantity }}</span>
            <button
              @click="quantity++"
              class="w-8 h-8 text-lg bg-gray-200 rounded-full"
            >
              +
            </button>
          </div>
        </div>
        <hr />

        <button
         @click="handleAddToCart(product)"
          class="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition rounded-full shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h11.1M7 13l1 2m6 6a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          Add to Cart
        </button>
        <Button
          @click="showDialog = true"
          class="w-full mt-2 text-white bg-black rounded-full hover:bg-slate-700"
          variant="default"
          >Go to Checkout →</Button
        >
        <Dialog v-model:open="showDialog">
          <DialogContent class="w-full max-w-lg p-6 bg-white rounded-xl">
            <DialogHeader>
              <DialogTitle class="text-2xl font-bold">Checkout</DialogTitle>
            </DialogHeader>

            <div class="mt-4 space-y-4">
              <div>
                <label class="text-sm text-gray-600">Name</label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Your full name"
                  class="w-full p-2 mt-1 border rounded"
                />
              </div>
              <div>
                <label class="text-sm text-gray-600">Email</label>
                <input
                  v-model="email"
                  type="text"
                  placeholder="Your email"
                  class="w-full p-2 mt-1 border rounded"
                />
              </div>

              <div>
                <label class="text-sm text-gray-600">Address</label>
                <input
                  v-model="address"
                  type="text"
                  placeholder="Shipping address"
                  class="w-full p-2 mt-1 border rounded"
                />
              </div>

              <div>
                <label class="text-sm text-gray-600">Payment Method</label>
                <select
                  v-model="paymentMethod"
                  class="w-full p-2 mt-1 border rounded"
                >
                  <option value="credit">Credit Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
            </div>

            <DialogFooter class="mt-6">
              <Button
                @click="confirmOrder"
                class="w-full text-white bg-green-600 rounded-full hover:bg-green-70"
              >
                Confirm Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <div v-else class="mt-10 text-center text-red-500">Product not found.</div>
  </section>
  <ProductTabs />
</template>

<style scoped>
.text-primary {
  color: hsl(var(--primary));
}
.bg-primary {
  background-color: hsl(var(--primary));
}
</style>
