<template>
  <div class="flex flex-col min-h-screen">
    <!-- Global Navbar -->
    <Navbar v-if="showNav" />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Navbar from "@/components/global/Navbar.vue";
import Footer from "@/components/global/Footer.vue";
const route = useRoute();
const showNav = computed(() => {
  return route.path !== "/login" && route.path !== "/register";
});
</script>
