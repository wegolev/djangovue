<template>
    <v-card>
      <v-img
        :src="product.image || '/placeholder-product.jpg'"
        height="200"
        class="align-end"
      >
        <v-chip
          v-if="product.category"
          class="ma-2"
          color="primary"
          small
        >
          {{ product.category.name }}
        </v-chip>
      </v-img>
  
      <v-card-title>{{ product.name }}</v-card-title>
  
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h6 primary--text">
            {{ product.price }} ₽
            <span class="text-caption">/{{ product.unit }}</span>
          </span>
          <v-btn
            icon
            color="primary"
            @click.stop="$emit('add-to-cart')"
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
  </script>