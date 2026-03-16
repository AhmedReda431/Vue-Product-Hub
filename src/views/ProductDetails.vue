<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-5xl mx-auto px-4">
      <button @click="goBack" 
        class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
        ← Back to products
      </button>

      <div v-if="product" class="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow">
        <div>
          <img :src="product.images[0]" :alt="product.title" 
            class="w-full rounded-2xl shadow-lg">
        </div>
        
        <div>
          <span class="inline-block px-4 py-1 bg-gray-100 text-sm rounded-full mb-4">
            {{ product.category.name }}
          </span>
          <h1 class="text-4xl font-bold leading-tight">{{ product.title }}</h1>
          <p class="text-5xl font-bold mt-6">${{ product.price }}</p>
          
          <div class="mt-10">
            <h3 class="font-semibold text-lg mb-3">Description</h3>
            <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <LoadingSpinner v-else-if="loading" />
      <ErrorMessage v-else :message="error" />
    </div>
  </div>
</template>

<script setup>
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
onMounted(async () => {
  try {
    const res = await axios.get(`${API_BASE}/products/${route.params.id}`)
    product.value = res.data
  } catch (e) {
    error.value = 'Product not found'
  } finally {
    loading.value = false
  }
})

const goBack = () => router.push('/')
</script>