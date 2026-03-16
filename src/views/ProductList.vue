<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      
      <SearchBar @search="handleSearch" />
      <CategoryFilter :categories="categories" @filter="handleFilter" />

      <LoadingSpinner v-if="loading" />

      <ErrorMessage v-else-if="error" :message="error" />

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
        <p class="text-2xl text-gray-400">No products found 😕</p>
        <p class="text-gray-500 mt-2">Try changing your search or filter</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in paginatedProducts" 
          :key="product.id"
          :product="product"
          @click="goToDetails(product.id)"
        />
      </div>

      <!-- Enhanced Pagination -->
      <div v-if="filteredProducts.length > 0" class="mt-12 flex justify-center">
        <div class="flex items-center gap-2 bg-white shadow-sm border border-gray-100 rounded-3xl p-2">
          
          <!-- Previous Button -->
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-6 py-3 flex items-center gap-2 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl transition-all font-medium">
            <span>←</span>
            <span>Previous</span>
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center gap-1 px-4">
            <span class="font-semibold text-gray-900">{{ currentPage }}</span>
            <span class="text-gray-400">of</span>
            <span class="font-medium text-gray-700">{{ totalPages }}</span>
          </div>

          <!-- Next Button -->
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="px-6 py-3 flex items-center gap-2 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl transition-all font-medium">
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const productsStore = useProductsStore()
const authStore = useAuthStore()
const router = useRouter()

const paginatedProducts = computed(() => productsStore.getPaginatedProducts())
const filteredProducts = computed(() => productsStore.filteredProducts)
const currentPage = computed(() => productsStore.currentPage)
const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / productsStore.itemsPerPage) || 1
)

const categories = computed(() => productsStore.categories)

onMounted(async () => {
  await productsStore.fetchProducts()
  await productsStore.fetchCategories()
})

const handleSearch = (term) => {
  productsStore.searchAndFilter(term, productsStore.currentCategoryId)
}

const handleFilter = (catId) => {
  productsStore.searchAndFilter(productsStore.currentSearchTerm, catId)
}

const goToDetails = (id) => router.push(`/product/${id}`)

const logout = () => {
  Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1f2937',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    if (result.isConfirmed) {
      authStore.logout()
      router.push('/login')
      Swal.fire({
        icon: 'success',
        title: 'Logged out',
        timer: 1200,
        showConfirmButton: false
      })
    }
  })
}

const prevPage = () => { 
  if (currentPage.value > 1) productsStore.currentPage-- 
}

const nextPage = () => { 
  if (currentPage.value < totalPages.value) productsStore.currentPage++ 
}
</script>