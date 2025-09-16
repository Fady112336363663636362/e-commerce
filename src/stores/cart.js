import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (product) => {
  const existing = cart.value.find((item) => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({
      ...product,
      price: Number(product.price) || 0, // 🟢 نحول السعر لرقم ونضمن عدم وجود NaN
      quantity: 1
    })
  }
}


  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id)
  }

  const increaseQuantity = (id) => {
    const item = cart.value.find((p) => p.id === id)
    if (item) item.quantity++
  }

  const decreaseQuantity = (id) => {
    const item = cart.value.find((p) => p.id === id)
    if (item && item.quantity > 1) item.quantity--
  }

const total = computed(() => {
  return cart.value.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + price * quantity
  }, 0)
})


  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
  }
})
