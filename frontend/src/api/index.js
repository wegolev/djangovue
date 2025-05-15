import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Django API адрес
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Добавляем интерсептор для JWT
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Products
  getProducts(categoryId = null) {
    const params = categoryId ? { category: categoryId } : {}
    return apiClient.get('/products/', { params })
  },
  getCategories() {
    return apiClient.get('/categories/')
  },

  // Auth
  login(credentials) {
    return apiClient.post('/token/', credentials)
  },
  register(userData) {
    return apiClient.post('/users/', userData)
  },

  // Orders
  createOrder(orderData) {
    return apiClient.post('/orders/', orderData)
  }
}