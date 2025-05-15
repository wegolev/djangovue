<template>
  <div class="cart">
    <v-container>
      <h1 class="text-h3 mb-6">Корзина</h1>

      <v-card v-if="cartItems.length > 0">
        <v-list>
          <v-list-item
            v-for="item in cartItems"
            :key="item.id"
          >
            <v-list-item-avatar>
              <v-img :src="item.image || '/placeholder-product.jpg'" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.price }} ₽ / {{ item.unit }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-text-field
                v-model.number="item.quantity"
                type="number"
                min="1"
                style="max-width: 80px"
                dense
              />
            </v-list-item-action>

            <v-list-item-action>
              <span class="font-weight-bold">
                {{ (item.price * item.quantity).toFixed(2) }} ₽
              </span>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon @click="removeItem(item.id)">
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />
          <div class="text-right">
            <p class="text-h6">Итого: {{ totalPrice }} ₽</p>
            <v-btn 
              color="primary" 
              large 
              @click="checkout"
              :loading="isCheckingOut"
            >
              Оформить заказ
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>

      <v-alert
        v-else
        type="info"
        class="mt-4"
      >
        Ваша корзина пуста
      </v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCheckingOut: false
    }
  },
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    totalPrice() {
      return this.$store.getters.cartTotal
    }
  },
  methods: {
    removeItem(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId)
    },
    async checkout() {
      this.isCheckingOut = true
      try {
        await this.$store.dispatch('checkout')
        this.$router.push('/order-success')
      } catch (error) {
        console.error('Ошибка оформления заказа:', error)
      } finally {
        this.isCheckingOut = false
      }
    }
  }
}
</script>