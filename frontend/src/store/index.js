import { createStore } from 'vuex'
import api from '../api'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: null, // Должен сохраняться при логине
    cartItems: [],
    categories: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser(state, user) {
      state.user = user
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    addToCart(state, product) {
      const existingItem = state.cartItems.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cartItems.push({
          product,
          quantity: 1,
          price_at_order: product.price
        })
      }
    },
    clearCart(state) {
      state.cartItems = []
      state.shippingAddress = ''
      state.orderComments = ''
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const response = await api.getCategories()
      commit('setCategories', response.data)
    },
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials)
        commit('setToken', response.data.access)
        commit('setUser', response.data.user)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async createOrder({ commit, state }, orderData) {
      const response = await api.post('/orders/', orderData)
      return response.data
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    cartTotal: state => {
      return state.cartItems.reduce((total, item) => 
        total + (item.price_at_order * item.quantity), 0)
    }
  }
})