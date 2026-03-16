<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
      <h2 class="text-4xl font-bold text-center mb-8">Create Account</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <input v-model="name" type="text" placeholder="Full Name" required
            class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none">
        </div>
        <div>
          <input v-model="email" type="email" placeholder="Email" required
            class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none">
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password (min 5 chars)" 
            required minlength="5"
            class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none">
        </div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-black disabled:opacity-70">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-8">
        Already have an account? 
        <router-link to="/login" class="text-blue-600 hover:underline">Login here</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (password.value.length < 5) {
    Swal.fire({
      icon: 'error',
      title: 'Password too short',
      text: 'Minimum 5 characters'
    })
    return
  }

  loading.value = true

  try {
    // 1. Register only (no auto login here)
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: 'https://i.pravatar.cc/150'
    })

    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'You can now login with your email and password.',
      confirmButtonColor: '#1f2937'
    })

    router.push('/login')   // Redirect to login page

  } catch (err) {
    console.error('Register error:', err.response?.data)

    let errorMsg = 'Registration failed. Please try again.'

    if (err.response?.data?.message) {
      errorMsg = Array.isArray(err.response.data.message) 
        ? err.response.data.message.join(' | ') 
        : err.response.data.message
    }

    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorMsg,
      confirmButtonColor: '#1f2937'
    })
  } finally {
    loading.value = false
  }
}
</script>