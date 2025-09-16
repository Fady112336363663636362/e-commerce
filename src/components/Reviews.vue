<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next' // icons

const currentIndex = ref(0)

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    message: 'Fantastic store! I love the product quality and fast delivery.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Sara Lee',
    rating: 4,
    message: 'Great value for money. Will shop again!',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Ali Hassan',
    rating: 4,
    message: 'Customer support was very helpful and responsive.',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Mariam Fathy',
    rating: 5,
    message: 'Loved it! Excellent quality and fast delivery.',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'Youssef Ali',
    rating: 3,
    message: 'Product is good but delivery was delayed.',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    name: 'Noura Ahmed',
    rating: 5,
    message: 'Everything went smoothly. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    name: 'Omar Adel',
    rating: 4,
    message: 'Very satisfied with my purchase.',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 8,
    name: 'Fatma Khaled',
    rating: 5,
    message: 'Amazing customer service and beautiful product!',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 9,
    name: 'Mohamed Said',
    rating: 4,
    message: 'Impressed by the packaging and product details.',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 10,
    name: 'Laila Mostafa',
    rating: 5,
    message: 'My new favorite store. Thank you!',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
]

const visibleReviews = computed(() => {
  return reviews.slice(currentIndex.value, currentIndex.value + 3)
})

const next = () => {
  if (currentIndex.value + 3 < reviews.length) currentIndex.value++
}

const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
</script>

<template>
  <section class="px-4 mx-auto bg-white py-14 max-w-7xl">
    <h2 class="mb-10 text-3xl font-bold text-center">What Our Customers Say</h2>

    <div class="flex items-center justify-center gap-4">
      <!-- Left Arrow -->
      <button
        @click="prev"
        class="p-2 transition border rounded-full hover:bg-gray-100"
        :disabled="currentIndex === 0"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <!-- Reviews Slider -->
      <div
        class="flex gap-5 overflow-hidden transition-all duration-500 ease-in-out"
        style="min-height: 250px"
      >
        <div
          v-for="review in visibleReviews"
          :key="review.id"
          class="p-6 transition-all shadow-md bg-gray-50 rounded-2xl w-80 hover:shadow-lg"
        >
          <div class="flex items-center gap-3 mb-4">
            <img :src="review.image" alt="user" class="object-cover w-12 h-12 rounded-full" />
            <h3 class="text-lg font-semibold">{{ review.name }}</h3>
          </div>

          <!-- Rating -->
          <div class="flex gap-1 mb-2 text-yellow-400">
            <span v-for="i in 5" :key="i">
              <span v-if="i <= review.rating">★</span>
              <span v-else class="text-gray-300">☆</span>
            </span>
          </div>

          <!-- Message -->
          <p class="text-base leading-relaxed text-gray-700">“{{ review.message }}”</p>
        </div>
      </div>

      <!-- Right Arrow -->
      <button
        @click="next"
        class="p-2 transition border rounded-full hover:bg-gray-100"
        :disabled="currentIndex + 3 >= reviews.length"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </section>
</template>
