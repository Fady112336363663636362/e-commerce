<template>
  <footer id="footer" class="bg-gray-300">
    <!-- العنوان والإيميل -->

    <section class="px-6 py-10 text-white bg-black">
      <div
        class="flex flex-col items-center justify-between gap-6 mx-auto max-w-7xl md:flex-row"
      >
        <!-- الكلام -->
        <div class="text-center md:text-left">
          <h2 class="text-3xl font-bold uppercase">
            Stay up to date about our<br />
            latest offers
          </h2>
        </div>

        <!-- الإيميل + زرار -->
        <div class="flex flex-col items-center w-full gap-3 md:w-auto">
           <div class="flex items-center w-full gap-3 sm:w-auto">
  <!-- الإيميل -->
  <div class="relative w-full sm:w-72">
    <span class="absolute inset-y-0 flex items-center text-black left-3">
      <!-- أيقونة الظرف من Heroicons -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-black">
        <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75zm1.591-.573 7.85 5.89a.75.75 0 0 0 .918 0l7.85-5.89a.75.75 0 0 0-.909-1.194L12 10.634 4.75 4.983a.75.75 0 1 0-.909 1.194z" />
      </svg>
    </span>
    <input
      type="email"
      placeholder="Enter your email"
      class="w-full py-2 pl-10 pr-4 text-black border border-gray-300 rounded-full outline-none"
    />
  </div>

  <!-- الزرار -->
  <button class="px-4 py-2 text-black transition rounded-full k hover:bg-slate-300 bg-slate-50">
    Subscribe
  </button>
</div>

        
        </div>
      </div>
    </section>

    <!-- روابط الفوتر -->
    <div
      class="grid grid-cols-1 gap-8 px-4 py-10 mx-auto text-sm text-gray-600 max-w-7xl sm:grid-cols-2 md:grid-cols-5"
    >
      <!-- SHOP.CO -->
      <div>
        <h3 class="mb-3 text-xl font-bold text-gray-900">SHOP.CO</h3>
        <p class="mb-4">We have all products that suits your need.</p>
        <div class="flex gap-3 text-xl">
          <i class="cursor-pointer fab fa-facebook"></i>
          <i class="cursor-pointer fab fa-twitter"></i>
          <i class="cursor-pointer fab fa-instagram"></i>
        </div>
      </div>

      <!-- COMPANY -->
      <div>
        <h4 class="mb-3 font-bold text-gray-900">COMPANY</h4>
        <ul class="space-y-2">
          <li><a href="#">About</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Works</a></li>
          <li><a href="#">Career</a></li>
        </ul>
      </div>

      <!-- HELP -->
      <div>
        <h4 class="mb-3 font-bold text-gray-900">HELP</h4>
        <ul class="space-y-2">
          <li><a href="#">Customers Support</a></li>
          <li><a href="#">Delivery Details</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- FAQ -->
      <div>
        <h4 class="mb-3 font-bold text-gray-900">FAQ</h4>
        <ul class="space-y-2">
          <li><a href="#">Account</a></li>
          <li><a href="#">Manage Deliveries</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Payments</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
// لا تحتاج أي سكريبت
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
