<template>
  <div class="cart-view">
    <h1>Ваша корзина</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      Корзина пуста. <router-link to="/">Вернуться к покупкам</router-link>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <div class="product-info">
            <h3>{{ item.product.name }}</h3>
            <div class="product-category">{{ item.product.category.name }}</div>
          </div>
          
          <div class="item-details">
            <div class="quantity-control">
              <button @click="decrement(item.product.id)" class="qty-btn">-</button>
              <input 
                type="number" 
                v-model.number="item.quantity" 
                min="1" 
                @change="updateQuantity(item)"
                class="qty-input"
              >
              <button @click="increment(item.product.id)" class="qty-btn">+</button>
            </div>
            
            <div class="price-info">
              <div class="price-total">
                {{ (item.price_at_order * item.quantity).toFixed(2) }} руб.
              </div>
              <div class="price-unit">
                {{ item.price_at_order }} руб./{{ getUnitDisplay(item.product.unit) }}
              </div>
            </div>
            
            <button @click="removeItem(item.product.id)" class="remove-btn">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>

      <div class="delivery-form">
        <h2>Данные для доставки</h2>
        
        <div class="form-group">
          <label>Адрес доставки:</label>
          <input 
            type="text" 
            v-model="shippingAddress" 
            required
            placeholder="Укажите полный адрес доставки"
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label>Способ доставки:</label>
          <select 
            v-model="selectedDelivery" 
            required
            class="form-select"
            :disabled="deliveryOptions.length === 0"
          >
            <option disabled value="">Выберите способ доставки</option>
            <option 
              v-for="option in deliveryOptions" 
              :key="option.id" 
              :value="option.id"
            >
              {{ option.name }} - {{ option.cost.toFixed(2) }} руб.
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Комментарий к заказу (необязательно):</label>
          <textarea 
            v-model="orderComments" 
            placeholder="Особенности доставки, контактный телефон и т.д."
            class="form-textarea"
          ></textarea>
        </div>
      </div>

      <div class="order-summary">
        <h2>Итого:</h2>
        
        <div class="summary-row">
          <span>Товары ({{ totalItems }} шт.):</span>
          <span>{{ cartTotal.toFixed(2) }} руб.</span>
        </div>
        
        <div class="summary-row" v-if="selectedDeliveryOption">
          <span>Доставка:</span>
          <span>{{ selectedDeliveryOption.cost.toFixed(2) }} руб.</span>
        </div>
        
        <div class="summary-row total">
          <span>Общая сумма:</span>
          <span>{{ totalWithDelivery.toFixed(2) }} руб.</span>
        </div>
        
        <button 
          @click="placeOrder" 
          :disabled="!canPlaceOrder || isProcessing"
          class="checkout-btn"
        >
          <span v-if="isProcessing">Обработка...</span>
          <span v-else>Оформить заказ</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import deliveryService from '@/services/deliveryService'

export default {
  data() {
    return {
      deliveryOptions: [],
      selectedDelivery: null,
      shippingAddress: '',
      orderComments: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['cartTotal']),
    
    selectedDeliveryOption() {
      return this.deliveryOptions.find(d => d.id === this.selectedDelivery)
    },
    
    totalWithDelivery() {
      const deliveryCost = this.selectedDeliveryOption ? this.selectedDeliveryOption.cost : 0
      return this.cartTotal + deliveryCost
    },
    
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    
    canPlaceOrder() {
      return (
        this.cartItems.length > 0 && 
        this.shippingAddress.trim() && 
        this.selectedDelivery
      )
    }
  },
  async created() {
    this.deliveryOptions = await deliveryService.getDeliveryOptions()
    if (this.deliveryOptions.length > 0) {
      this.selectedDelivery = this.deliveryOptions[0].id
    }
  },
  methods: {
    ...mapMutations(['updateQuantity', 'removeFromCart', 'clearCart']),
    ...mapActions(['createOrder']),
    
    getUnitDisplay(unit) {
      const units = { 
        ton: 'т', 
        m3: 'м³', 
        kg: 'кг',
        piece: 'шт.'
      }
      return units[unit] || unit
    },
    
    increment(itemId) {
      this.updateQuantity({ itemId, quantity: this.getCurrentQuantity(itemId) + 1 })
    },
    
    decrement(itemId) {
      const current = this.getCurrentQuantity(itemId)
      if (current > 1) {
        this.updateQuantity({ itemId, quantity: current - 1 })
      }
    },
    
    getCurrentQuantity(itemId) {
      const item = this.cartItems.find(item => item.product.id === itemId)
      return item ? item.quantity : 0
    },
    
    updateQuantity(item) {
      if (item.quantity < 1 || isNaN(item.quantity)) {
        item.quantity = 1
      }
      this.updateQuantity({ 
        itemId: item.product.id, 
        quantity: item.quantity 
      })
    },
    
    removeItem(itemId) {
      this.removeFromCart(itemId)
    },
    
    async placeOrder() {
      this.isProcessing = true;
      
      try {
        const orderData = {
          delivery_address: this.shippingAddress,
          comments: this.orderComments,
          delivery_option: this.selectedDelivery,
          order_items: this.cartItems.map(item => ({
            product: item.product.id,
            quantity: item.quantity,
            price_at_order: item.price_at_order
          }))
        };

        // Добавляем логирование для отладки
        console.log('Отправка заказа:', orderData);
        
        const response = await this.$api.createOrder(orderData);
        console.log('Ответ сервера:', response);
        
        if (response.data && response.data.id) {
          this.clearCart();
          this.$router.push({ 
            name: 'order-success', 
            params: { orderId: response.data.id }
          });
        } else {
          console.error('Неверный формат ответа сервера');
        }
      } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        // Можно добавить уведомление для пользователя
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.');
      } finally {
        this.isProcessing = false;
      }
    }
  }
}
</script>

<style scoped>
/* Стили остаются без изменений */
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  font-size: 1.1em;
  color: #666;
}

.empty-cart a {
  color: #42b983;
  text-decoration: none;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.product-info {
  margin-bottom: 10px;
}

.product-category {
  font-size: 0.9em;
  color: #666;
}

.item-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.qty-btn {
  width: 30px;
  height: 30px;
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: #eaeaea;
}

.qty-input {
  width: 50px;
  text-align: center;
  margin: 0 5px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.price-info {
  text-align: right;
  min-width: 120px;
}

.price-total {
  font-weight: bold;
}

.price-unit {
  font-size: 0.8em;
  color: #666;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  margin-left: 15px;
  padding: 5px;
}

.delivery-form {
  margin: 30px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.order-summary {
  border-top: 2px solid #eee;
  padding-top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
}

.summary-row.total {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #3aa876;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>