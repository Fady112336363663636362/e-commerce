<script setup>
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-vue-next";
import { ref, computed } from "vue"; 
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const cartStore = useCartStore()

const promoCode = ref('')
const deliveryFee = 10
const discount = 0.1





const discountedTotal = computed(() =>
  cartStore.total * (1 - discount)
)

const finalTotal = computed(() => {
  const total = Number(cartStore.total) || 0
  const discountValue = total * discount
  return (total - discountValue + deliveryFee).toFixed(2)
})


const showDialog = ref(false)
const name = ref('')
const email = ref('')
const address = ref('')
const paymentMethod = ref('credit')


const confirmOrder = () => {
  alert(
    `Order confirmed for ${name.value}, will be shipped to ${address.value}, paid via ${paymentMethod.value}`
  );
  showDialog.value = false;
};
</script>


<template>
  <Navbar />
  <section class="px-4 py-10 mx-auto max-w-7xl">
    <h2 class="mb-6 text-3xl font-bold">🛒 Your Cart</h2>

    <div class="grid gap-8 md:grid-cols-3">
      <!-- Cart Items -->
      <div class="space-y-4 md:col-span-2">
        <div
          v-for="item in cartStore.cart"
          :key="item.id"
          class="flex items-center justify-between p-4 border rounded-lg"
        >
          <div class="flex items-center gap-4">
            <img :src="item.thumbnail" class="object-cover w-16 h-16 rounded" />
            <div>
              <h4 class="text-sm font-semibold">{{ item.title }}</h4>
              <p class="text-xs text-gray-500">
                ${{ item.price }} × {{ item.quantity }} = ${{
                  (item.price * item.quantity).toFixed(2)
                }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <Button
              @click="cartStore.decreaseQuantity(item.id)"
              variant="outline"
              >-</Button
            >
            <span class="px-2">{{ item.quantity }}</span>
            <Button
              @click="cartStore.increaseQuantity(item.id)"
              variant="outline"
              >+</Button
            >
            <Button @click="cartStore.removeFromCart(item.id)" variant="ghost">
              <Trash2 class="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="p-6 space-y-4 border rounded-lg bg-gray-50">
        <h3 class="mb-2 text-lg font-semibold">Order Summary</h3>
        <div class="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Discount</span>
          <span class="text-red-500"
            >-${{ (cartStore.total * discount).toFixed(2) }}</span
          >
        </div>
        <div class="flex justify-between text-sm">
          <span>Delivery Fee</span>
          <span>${{ deliveryFee.toFixed(2) }}</span>
        </div>
        <hr />
        <div class="flex justify-between font-bold text-md">
          <span>Total</span>
       <span>${{ finalTotal || '0.00' }}</span>

        </div>

        <div class="flex flex-col w-full gap-3">
          <div class="flex items-center w-full gap-3 sm:w-auto">
            <!-- الإيميل -->
            <div class="relative w-full sm:w-72">
              <Input
                v-model="promoCode"
                placeholder="Add promo code"
                class="w-full py-2 pl-10 pr-4 text-black border border-gray-300 rounded-full outline-none"
              />
            </div>

            <!-- الزرار -->
            <Button class="text-white bg-black rounded-full hover:bg-slate-700"
              >Apply</Button
            >
          </div>
        </div>

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
  </section>

  <Footer />
</template>
