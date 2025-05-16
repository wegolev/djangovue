<template>
    <div class="register-container">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-group">
          <label>Имя пользователя:</label>
          <input 
            v-model="username"
            type="text"
            required
            placeholder="Придумайте логин"
          >
        </div>
  
        <div class="form-group">
          <label>Email:</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Введите email"
          >
        </div>
  
        <div class="form-group">
          <label>Пароль:</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Придумайте пароль"
          >
        </div>
  
        <button type="submit" :disabled="loading">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
  
        <div class="login-link">
          Уже есть аккаунт? <router-link to="/login">Войдите</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        loading: false
      }
    },
    methods: {
      ...mapActions(['register']),
      async handleSubmit() {
        this.loading = true
        try {
          await this.register({
            username: this.username,
            email: this.email,
            password: this.password
          })
          alert('Регистрация успешна! Теперь вы можете войти.')
          this.$router.push('/login')
        } catch (error) {
          console.error('Ошибка регистрации:', error)
          alert('Ошибка при регистрации')
        } finally {
          this.loading = false
        }
      },
      async handleSubmit() {
        this.loading = true;
        try {
          const response = await this.$api.register({
            username: this.username,
            email: this.email,
            password: this.password
          });
          
          // Добавить автоматический вход после регистрации
          await this.login({
            username: this.username,
            password: this.password
          });
          
          this.$router.push('/');
        } catch (error) {
          console.error('Registration error:', error.response?.data);
          alert(error.response?.data?.detail || 'Ошибка регистрации');
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .register-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background: #ccc;
  }
  
  .login-link {
    margin-top: 15px;
    text-align: center;
  }
  
  .login-link a {
    color: #42b983;
  }
  </style>