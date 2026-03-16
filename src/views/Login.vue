<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
      <h2 class="text-4xl font-bold text-center mb-8">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <input v-model="email" type="email" placeholder="Email" required
            class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none">
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" required
            class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none">
        </div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-black disabled:opacity-70">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-8">
        Don't have an account? 
        <router-link to="/register" class="text-blue-600 hover:underline">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true

  try {
    await authStore.login({ email: email.value, password: password.value })

    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: `Welcome back!`,
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/')

  } catch (err) {
    console.error('Login error:', err.response?.data)

    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password',
      confirmButtonColor: '#1f2937'
    })
  } finally {
    loading.value = false
  }
}
</script>