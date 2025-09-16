<template>
  <Navbar />
  <div id="home">
    <Banner />
  </div>
  <div id="shop">
    <NewArrivals />
  </div>
  <div id="top-selling">
    <TopSelling />
  </div>
  <div id="favorites">
    <Reviews />
  </div>
  <div id="footer">
   <Footer />
  </div>

</template>


<script setup>
import Banner from "@/components/Banner.vue";
import Navbar from "@/components/Navbar.vue";
import NewArrivals from "@/components/NewArrivals.vue";
import TopSelling from "@/components/TopSelling.vue";
import Reviews from "@/components/Reviews.vue";
import Footer from "@/components/Footer.vue";
import { onMounted } from 'vue'

onMounted(() => {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 300); // وقت بسيط يضمن تحميل الصفحة
    }
  }
});

</script>
