import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

const app = createApp(App)
app.use(router)
app.use(store)

// Добавляем $api в глобальные свойства
app.config.globalProperties.$api = api

app.mount('#app')
