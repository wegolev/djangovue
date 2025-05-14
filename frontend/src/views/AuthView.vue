<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Логин">
    <input v-model="password" type="password" placeholder="Пароль">
    <button type="submit">Войти</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const response = await axios.post('/token/', {
        username: this.username,
        password: this.password,
      });
      localStorage.setItem('token', response.data.access);
      this.$router.push('/');
    },
  },
};
</script>