import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async register(userData) {
      const res = await axios.post(`${API_BASE}/users`, userData)
      return res.data
    },
    async login(credentials) {
      const res = await axios.post(`${API_BASE}/auth/login`, credentials)
      this.token = res.data.access_token
      // Get user profile
      const profile = await axios.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.user = profile.data
    },
    logout() {
      this.token = null
      this.user = null
    }
  },
  persist: true // auto-saves to localStorage
})