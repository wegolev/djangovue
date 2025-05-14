<template>
    <div class="product-detail">
      <v-container v-if="product">
        <v-row>
          <v-col cols="6">
            <v-img
              :src="product.image || '/placeholder-product.jpg'"
              height="400"
              contain
            />
          </v-col>
  
          <v-col cols="6">
            <h1 class="text-h3">{{ product.name }}</h1>
            <v-chip class="my-2">{{ product.category.name }}</v-chip>
  
            <div class="my-4">
              <span class="text-h4 primary--text">{{ product.price }} ₽</span>
              <span class="ml-2">/{{ product.unit }}</span>
            </div>
  
            <v-text-field
              v-model.number="quantity"
              type="number"
              label="Количество"
              min="1"
              :step="product.unit === 'ton' ? 0.5 : 1"
            />
  
            <v-btn 
              color="primary" 
              large 
              @click="addToCart"
            >
              Добавить в корзину
            </v-btn>
  
            <v-tabs class="mt-8">
              <v-tab>Описание</v-tab>
              <v-tab>Характеристики</v-tab>
  
              <v-tab-item>
                <p class="mt-4">{{ product.description }}</p>
              </v-tab-item>
              <v-tab-item>
                <v-simple-table class="mt-4">
                  <tbody>
                    <tr v-for="(value, key) in product.specs" :key="key">
                      <td>{{ key }}</td>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null,
        quantity: 1
      }
    },
    async created() {
      const productId = this.$route.params.id
      this.product = await this.$api.getProduct(productId)
    },
    methods: {
      addToCart() {
        const cartItem = {
          ...this.product,
          quantity: this.quantity
        }
        this.$store.commit('ADD_TO_CART', cartItem)
      }
    }
  }
  </script>