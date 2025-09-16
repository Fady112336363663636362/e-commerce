<script setup>
import { ref, reactive } from 'vue'
import Footer from './Footer.vue'

const activeTab = ref('details')

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' }
]

const colors = ['Black', 'White', 'Beige', 'Gray']
const sizes = ['S', 'M', 'L', 'XL']

const reviews = [
  { name: 'Sarah', rating: 5, comment: 'Amazing quality, will buy again!' },
  { name: 'Ahmed', rating: 4, comment: 'Great product but shipping was a bit late.' },
  { name: 'Lina', rating: 5, comment: 'Perfect fit and great design.' },
  { name: 'Tarek', rating: 3, comment: 'Good but not excellent.' },
  { name: 'Maya', rating: 4, comment: 'Stylish and comfortable!' },
]

const faqs = reactive([
  { question: 'Is this product washable?', answer: 'Yes, machine wash cold.', open: false },
  { question: 'Does it come with warranty?', answer: '6-month warranty included.', open: false },
  { question: 'Can I return it?', answer: 'Returns allowed within 14 days.', open: false },
  { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide.', open: false },
  { question: 'What payment methods are accepted?', answer: 'Visa, MasterCard, and Cash on Delivery.', open: false },
])

const toggleFAQ = (index) => {
  faqs[index].open = !faqs[index].open
}
</script>

<template>
  <section class="w-full px-4 py-12 bg-white border-t border-gray-200">
    <!-- Tabs -->
    <div class="flex justify-center mb-8 space-x-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200',
          activeTab === tab.id
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->
    <div class="max-w-5xl px-4 mx-auto">
      <!-- DETAILS TAB -->
      <div v-if="activeTab === 'details'" class="space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          Crafted with care and designed for everyday comfort. This product features premium materials for a high-end look and feel.
        </p>

        <div>
          <h4 class="mb-1 font-semibold text-gray-800">Available Colors</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="color in colors"
              :key="color"
              class="px-3 py-1 text-xs text-gray-800 border border-gray-300 rounded-full bg-gray-50"
            >
              {{ color }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="mb-1 font-semibold text-gray-800">Available Sizes</h4>
          <div class="flex gap-2">
            <span
              v-for="size in sizes"
              :key="size"
              class="px-3 py-1 text-xs text-gray-800 border border-gray-300 rounded-full bg-gray-50"
            >
              {{ size }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="mb-1 font-semibold text-gray-800">Material</h4>
          <p class="text-sm text-gray-600">
            Breathable cotton-polyester blend, soft touch finish, and durable stitchwork.
          </p>
        </div>
      </div>

      <!-- REVIEWS TAB -->
      <div v-else-if="activeTab === 'reviews'" class="grid gap-4 mt-6 sm:grid-cols-2">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="p-4 transition bg-white border shadow-sm rounded-xl hover:shadow-md"
        >
          <div class="flex items-center gap-1 mb-2 text-sm text-yellow-400">
            <span v-for="i in 5" :key="i">
              <span v-if="i <= review.rating">★</span>
              <span v-else class="text-gray-300">☆</span>
            </span>
            <span class="ml-1 text-xs text-gray-500">({{ review.rating }}/5)</span>
          </div>
          <p class="mb-1 text-sm text-gray-800">"{{ review.comment }}"</p>
          <span class="text-xs text-gray-500">- {{ review.name }}</span>
        </div>
      </div>

      <!-- FAQ TAB -->
      <div v-else-if="activeTab === 'faqs'" class="mt-6 space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="p-4 border rounded-xl bg-gray-50"
        >
          <button
            @click="toggleFAQ(index)"
            class="flex items-center justify-between w-full font-semibold text-left text-gray-800"
          >
            <span>{{ faq.question }}</span>
            <svg
              :class="{ 'rotate-180': faq.open }"
              class="w-5 h-5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="faq.open" class="mt-2 text-sm text-gray-600">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>
