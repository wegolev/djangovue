import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
// import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(router)
app.use(store)
// app.use(vuetify)

// Добавляем API в глобальные свойства
app.config.globalProperties.$api = api

app.mount('#app')
