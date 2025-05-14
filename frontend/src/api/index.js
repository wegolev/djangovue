import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

export default {
  // Auth
  login(credentials) {
    return api.post('/token/', credentials)
  },
  
  // Products
  getProducts() {
    return api.get('/products/')
  },
  
  // Orders
  createOrder(orderData) {
    return api.post('/orders/', orderData)
  }
}