<template>
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="price">
        {{ product.price }} руб./{{ unitDisplay }}
      </div>
      <button @click="addToCart">В корзину</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      unitDisplay() {
        const units = {
          ton: 'т',
          m3: 'м³',
          kg: 'кг'
        }
        return units[this.product.unit] || this.product.unit
      }
    },
    methods: {
      addToCart() {
        this.$store.commit('addToCart', this.product)
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    margin: 1rem;
    border-radius: 5px;
    max-width: 300px;
  }
  button {
    background: #42b983;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  </style>