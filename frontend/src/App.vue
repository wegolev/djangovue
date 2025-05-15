<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/login" v-if="!isAuthenticated">Вход</router-link>
      <template v-else>
        <router-link to="/profile">Профиль</router-link> |
        <a @click="logout">Выйти</a>
      </template>
      | <router-link to="/cart">Корзина ({{ cartItemsCount }})</router-link>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['isAuthenticated']),
    cartItemsCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0)
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>