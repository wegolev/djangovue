<template>
  <div class="auth">
    <v-container style="max-width: 500px">
      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab>Вход</v-tab>
          <v-tab>Регистрация</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="loginForm.username"
                  label="Логин"
                  required
                />
                <v-text-field
                  v-model="loginForm.password"
                  label="Пароль"
                  type="password"
                  required
                />
                <v-btn 
                  type="submit" 
                  color="primary" 
                  block
                >
                  Войти
                </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>

          <v-tab-item>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  v-model="registerForm.username"
                  label="Логин"
                  required
                />
                <v-text-field
                  v-model="registerForm.email"
                  label="Email"
                  type="email"
                  required
                />
                <v-text-field
                  v-model="registerForm.password"
                  label="Пароль"
                  type="password"
                  required
                />
                <v-text-field
                  v-model="registerForm.phone"
                  label="Телефон"
                  required
                />
                <v-btn 
                  type="submit" 
                  color="primary" 
                  block
                >
                  Зарегистрироваться
                </v-btn>
              </v-form>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        phone: '',
        company_name: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.loginForm)
        this.$router.push('/')
      } catch (error) {
        alert('Ошибка авторизации')
      }
    },
    async register() {
      try {
        await this.$api.register(this.registerForm)
        this.tab = 0 // Переключить на вкладку входа
        alert('Регистрация успешна! Теперь войдите')
      } catch (error) {
        alert('Ошибка регистрации')
      }
    }
  }
}
</script>