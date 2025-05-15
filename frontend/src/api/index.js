import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

// Автоматическая подстановка токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Аутентификация
  login(credentials) {
    return api.post('/token/', credentials)
  },
  register(userData) {
    return api.post('/users/', userData)
  },
  getCurrentUser() {
    return api.get('/users/me/')
  },

  // Товары
  getProducts() {
    return api.get('/products/')
  },
  getProduct(id) {
    return api.get(`/products/${id}/`)
  },
  getCategories() {
    return api.get('/categories/')
  },

  // Заказы
  createOrder(orderData) {
    return api.post('/orders/', orderData)
  },
  getOrders() {
    return api.get('/orders/')
  },
  getOrder(id) {
    return api.get(`/orders/${id}/`)
  },
  getOrderItems() {
    return api.get('/order-items/')
  },

  // Доставка
  getDeliveries() {
    return api.get('/deliveries/')
  },
  createDelivery(deliveryData) {
    return api.post('/deliveries/', deliveryData)
  }
}