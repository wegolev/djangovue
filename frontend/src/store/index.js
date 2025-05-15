import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
    cartItems: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser(state, user) {
      state.user = user
    },
    addToCart(state, item) {
      state.cartItems.push(item)
    }
  },
  actions: {
    async login({ commit }, credentials) {
      // Реализуем позже
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    cartTotal: state => {
      return state.cartItems.reduce((total, item) => total + item.price, 0)
    }
  }
})