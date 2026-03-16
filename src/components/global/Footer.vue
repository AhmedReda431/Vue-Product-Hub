<template>
  <footer class="bg-gray-900 text-gray-400 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-white rounded-2xl flex items-center justify-center"
            >
              <span class="text-gray-900 font-bold text-xl">🛍️</span>
            </div>
            <span class="text-white font-bold text-2xl">ProductHub</span>
          </div>
          <p class="text-sm">
            A modern product management app built with Vue 3
          </p>
        </div>

        <!-- Center -->
        <div class="text-center md:text-left">
          <h4 class="text-white font-medium mb-3">Quick Links</h4>
          <div class="flex flex-col gap-2 text-sm">
            <router-link to="/" class="hover:text-white transition"
              >Products</router-link
            >
            <router-link to="/login" class="hover:text-white transition" v-if="!isLoggedIn"
              >Login</router-link
            >
            <router-link to="/register" class="hover:text-white transition" v-if="!isLoggedIn"
              >Register</router-link
            >
          </div>
        </div>

        <!-- Right -->
        <div class="text-center md:text-right">
          <h4 class="text-white font-medium mb-3">Made with ❤️</h4>
          <p class="text-sm">Using Vue 3 + Pinia + Tailwind CSS</p>
          <p class="text-xs mt-4">
            © 2026 ProductHub. All rights reserved | Ahmed Reda.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
const authStore = useAuthStore();
const isLoggedIn = computed(() => {
  return !!authStore.token;
});
</script>
