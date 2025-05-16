<template>
    <div class="profile-view">
      <h1>Личный кабинет</h1>
      
      <div v-if="!isAuthenticated" class="auth-warning">
        Пожалуйста, <router-link to="/login">войдите</router-link> для просмотра истории заказов
      </div>
  
      <div v-else>
        <div class="user-info">
          <h2>Профиль</h2>
          <p>Логин: {{ user.username }}</p>
          <p>Email: {{ user.email }}</p>
        </div>
  
        <div class="orders-history">
          <h2>История заказов</h2>
          
          <div v-if="loading" class="loading">Загрузка...</div>
          <div v-else-if="orders.length === 0" class="no-orders">
            У вас пока нет заказов
          </div>
          
          <div v-else class="order-list">
            <div v-for="order in orders" :key="order.id" class="order-card">
              <div class="order-header">
                <span class="order-id">Заказ #{{ order.id }}</span>
                <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
                <span class="order-date">{{ formatDate(order.created_at) }}</span>
                <span class="order-total">{{ order.total_price }} руб.</span>
              </div>
              
              <div class="order-items">
                <div v-for="item in order.items" :key="item.id" class="order-item">
                  <span class="item-name">{{ item.product.name }}</span>
                  <span class="item-quantity">{{ item.quantity }} {{ getUnitDisplay(item.product.unit) }}</span>
                  <span class="item-price">{{ item.total_price }} руб.</span>
                </div>
              </div>
              
              <div v-if="order.delivery" class="order-delivery">
                <div>Доставка: {{ getTransportLabel(order.delivery.transport_type) }}</div>
                <div>Адрес: {{ order.delivery_address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapState } from 'vuex'
  
  export default {
    data() {
      return {
        loading: false,
        orders: []
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      ...mapState(['user'])
    },
    async created() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      await this.loadOrders()
    },
    methods: {
      async loadOrders() {
        this.loading = true
        try {
          const response = await this.$api.get('/api/orders/')
          this.orders = response.data
        } catch (error) {
          console.error('Ошибка загрузки заказов:', error)
        } finally {
          this.loading = false
        }
      },
      getStatusText(status) {
        const statuses = {
          new: 'Новый',
          processing: 'В обработке',
          shipped: 'Доставляется',
          completed: 'Завершен',
          cancelled: 'Отменен'
        }
        return statuses[status] || status
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString()
      },
      getUnitDisplay(unit) {
        const units = { ton: 'т', m3: 'м³', kg: 'кг', piece: 'шт.' }
        return units[unit] || unit
      },
      getTransportLabel(type) {
        const types = {
          truck: 'Грузовик',
          dump_truck: 'Самосвал',
          loader: 'Погрузчик'
        }
        return types[type] || type
      }
    }
  }
  </script>
  
  <style scoped>
  .profile-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .auth-warning {
    text-align: center;
    padding: 30px;
    font-size: 1.2em;
  }
  
  .user-info {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .order-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .order-status {
    font-weight: bold;
  }
  
  .order-status.new {
    color: #2196F3;
  }
  
  .order-status.completed {
    color: #4CAF50;
  }
  
  .order-items {
    margin: 10px 0;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .order-delivery {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #ddd;
    font-size: 0.9em;
    color: #666;
  }
  
  .loading, .no-orders {
    text-align: center;
    padding: 30px;
    color: #666;
  }
  </style>