<template>
    <div class="order-history">
      <v-container>
        <h1 class="text-h3 mb-6">История заказов</h1>
  
        <v-card v-if="orders.length > 0">
          <v-list>
            <v-list-item
              v-for="order in orders"
              :key="order.id"
              @click="$router.push(`/orders/${order.id}`)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Заказ #{{ order.id }} от {{ formatDate(order.created_at) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Статус: {{ getStatusText(order.status) }}
                </v-list-item-subtitle>
              </v-list-item-content>
  
              <v-list-item-action>
                <span class="font-weight-bold">
                  {{ order.total_price }} ₽
                </span>
              </v-list-item-action>
  
              <v-list-item-action>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
  
        <v-alert
          v-else
          type="info"
          class="mt-4"
        >
          У вас пока нет заказов
        </v-alert>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: []
      }
    },
    async created() {
      this.orders = await this.$api.getUserOrders()
    },
    methods: {
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString()
      },
      getStatusText(status) {
        const statuses = {
          'new': 'Новый',
          'processing': 'В обработке',
          'shipped': 'Отправлен',
          'completed': 'Завершен'
        }
        return statuses[status] || status
      }
    }
  }
  </script>