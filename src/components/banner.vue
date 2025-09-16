<script setup>
import bannerImage from '@/assets/imgs/banner.jpg'
import { RouterLink } from 'vue-router'
</script>

<template>
  
  <section
    id="home"
     class="relative flex items-center w-full h-[750px] bg-left bg-no-repeat bg-cover px-10"
    :style="{ backgroundImage: `url(${bannerImage})` }"
  >
   
    <div class="z-10 max-w-xl mb-20 text-left text-black">
      <h1 class="mb-4 text-5xl font-extrabold leading-tight">
        FIND CLOTHES <br />
        THAT MATCHES <br />
        YOUR STYLE
      </h1>

      <p class="mb-6 text-gray-700">
        Browse through our diverse range of meticulously crafted garments,<br />
        designed to bring out your individuality and cater to your sense of style.
      </p>

      <RouterLink
        to="/products"
        class="inline-block px-6 py-3 text-sm font-semibold text-center text-white transition bg-black rounded-full w-44 hover:bg-gray-600"
      >
        Shop Now
      </RouterLink>


      <div class="grid grid-cols-3 gap-4 mt-10 text-sm font-semibold text-center text-black">
        <div>
          <p class="text-3xl font-bold">200+</p>
          <p>International Brands</p>
        </div>
        <div>
          <p class="text-3xl font-bold">2,000+</p>
          <p>High-Quality Products</p>
        </div>
        <div>
          <p class="text-3xl font-bold">30,000+</p>
          <p>Happy Customers</p>
        </div>
      </div>
    </div>
  </section>
</template>
