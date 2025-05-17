<template>
    <header class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="logo">Магазин инертных материалов</router-link>
      </div>
      
      <nav class="navbar-menu">
        <router-link to="/">Главная</router-link>
        <router-link to="/cart">Корзина ({{ cartItemsCount }})</router-link>
        
        <template v-if="isAuthenticated">
          <router-link to="/profile">Профиль</router-link>
          <button @click="logout" class="logout-btn">Выйти</button>
        </template>
        <template v-else>
          <router-link to="/login">Вход</router-link>
          <router-link to="/register">Регистрация</router-link>
        </template>
      </nav>
    </header>
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
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: white;
  }
  
  .logo {
    color: white;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  .navbar-menu a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
    padding: 0.5rem 0;
  }
  
  .navbar-menu a:hover {
    border-bottom: 2px solid #42b983;
  }
  
  .logout-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 1.5rem;
    font-size: 1rem;
    padding: 0.5rem 0;
  }
  
  .logout-btn:hover {
    border-bottom: 2px solid #ff4444;
  }
  </style>