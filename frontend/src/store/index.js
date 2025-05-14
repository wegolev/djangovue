import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [],
    user: null
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart.push(product)
    },
    SET_USER(state, userData) {
      state.user = userData
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await this.$api.login(credentials)
      commit('SET_USER', response.data.user)
    }
  }
})