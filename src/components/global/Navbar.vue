<template>
  <nav class="bg-white border-b sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <div
            class="w-9 h-9 bg-gray-900 rounded-2xl flex items-center justify-center"
          >
            <span class="text-white font-bold text-2xl">🛍️</span>
          </div>
          <div>
            <span class="font-bold text-2xl tracking-tight text-gray-900"
              >ProductHub</span
            >
          </div>
        </router-link>

        <!-- Right Side -->
        <div class="flex items-center gap-4">
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Login
          </router-link>

          <router-link
            v-if="!isLoggedIn"
            to="/register"
            class="px-6 py-2.5 bg-gray-900 text-white rounded-2xl font-medium hover:bg-black transition"
          >
            Register
          </router-link>

          <!-- Logout Button (only when logged in) -->
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="flex items-center gap-2 px-6 py-2.5 text-red-600 hover:bg-red-50 rounded-2xl font-medium transition"
          >
            <span>Logout</span>
            <!-- Example: Embedded SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
              />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => !!authStore.token);

const handleLogout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#1f2937",
    cancelButtonColor: "#d1d5db",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      authStore.logout();
      router.push("/login");
    }
  });
};
</script>
