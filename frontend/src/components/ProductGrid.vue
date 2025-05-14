<template>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard 
          :product="product"
          @add-to-cart="$emit('add-to-cart', product)"
        />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import ProductCard from './ProductCard.vue'
  
  export default {
    components: { ProductCard },
    props: {
      products: {
        type: Array,
        required: true
      }
    }
  }
  </script>