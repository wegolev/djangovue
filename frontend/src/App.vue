<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/login">Вход</router-link> |
      <router-link to="/cart">Корзина</router-link>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
nav {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}
nav a {
  margin: 0 0.5rem;
}
</style>