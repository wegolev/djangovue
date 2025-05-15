import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    products: [],
    categories: [],
    loading: false,
    error: null
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existing = state.cart.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        state.cart.push(product)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    SET_USER(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await this.$api.login(credentials)
        localStorage.setItem('token', response.data.access)
        commit('SET_USER', response.data.user)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.detail || 'Ошибка авторизации')
        return { success: false, error: error.response?.data }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async logout({ commit }) {
      localStorage.removeItem('token')
      commit('CLEAR_USER')
    },
    async loadProducts({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        const response = await this.$api.getProducts()
        commit('SET_PRODUCTS', response.data)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.detail || 'Ошибка загрузки товаров')
        return { success: false, error: error.response?.data }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async loadCategories({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await this.$api.getCategories()
        commit('SET_CATEGORIES', response.data)
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.detail || 'Ошибка загрузки категорий')
        return { success: false, error: error.response?.data }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async checkout({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        const order = {
          items: state.cart.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price_at_order: item.price
          }))
        }
        await this.$api.createOrder(order)
        commit('CLEAR_CART')
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.detail || 'Ошибка оформления заказа')
        return { success: false, error: error.response?.data }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    productById: state => id => {
      return state.products.find(product => product.id === id)
    },
    isLoading: state => state.loading,
    error: state => state.error
  }
})