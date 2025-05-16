<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label>Имя пользователя:</label>
        <input 
          v-model="username"
          type="text"
          required
          placeholder="Введите ваш логин"
        >
      </div>
      
      <div class="form-group">
        <label>Пароль:</label>
        <input
          v-model="password"
          type="password"
          required
          placeholder="Введите пароль"
        >
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>

      <div class="register-link">
        Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link>
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
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit() {
      this.loading = true
      try {
        await this.login({
          username: this.username,
          password: this.password
        })
        this.$router.push('/') // Перенаправляем на главную после входа
      } catch (error) {
        console.error('Ошибка входа:', error)
        alert('Неверные учетные данные')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.login-form {
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

.register-link {
  margin-top: 15px;
  text-align: center;
}

.register-link a {
  color: #42b983;
}
</style>