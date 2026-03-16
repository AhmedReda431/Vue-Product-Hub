import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    filteredProducts: [],
    currentPage: 1,
    itemsPerPage: 12,
    loading: false,
    error: null,
    currentSearchTerm: '',
    currentCategoryId: ''
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        // Minimum loading time for better UX (spinner will show at least 800ms)
        const [res] = await Promise.all([
          axios.get(`${API_BASE}/products?limit=200`),
          new Promise(resolve => setTimeout(resolve, 800)) // ← This is the fix
        ])

        this.products = res.data
        this.filteredProducts = [...res.data]
      } catch (e) {
        this.error = 'Failed to load products. Please refresh the page.'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const res = await axios.get(`${API_BASE}/categories`)
        this.categories = res.data
      } catch (e) {
        console.error('Failed to load categories', e)
      }
    },

    searchAndFilter(searchTerm = '', categoryId = '') {
      this.currentSearchTerm = searchTerm
      this.currentCategoryId = categoryId

      let result = [...this.products]

      if (searchTerm && searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim()
        result = result.filter(p => 
          p.title.toLowerCase().includes(term)
        )
      }

      if (categoryId) {
        result = result.filter(p => 
          p.category && p.category.id === Number(categoryId)
        )
      }

      this.filteredProducts = result
      this.currentPage = 1
    },

    getPaginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredProducts.slice(start, start + this.itemsPerPage)
    }
  }
})