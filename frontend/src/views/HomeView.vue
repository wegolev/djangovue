<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    
    <div class="filters">
      <select v-model="selectedCategory">
        <option value="">Все категории</option>
        <option v-for="category in categories" :value="category.id" :key="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      selectedCategory: null
    }
  },
  computed: {
    ...mapState(['categories']),
    filteredProducts() {
      if (!this.selectedCategory) return this.products
      return this.products.filter(p => p.category.id == this.selectedCategory)
    }
  },
  async created() {
    await this.fetchCategories()
    const response = await this.$api.getProducts()
    this.products = response.data
  },
  methods: {
    ...mapActions(['fetchCategories'])
  }
}
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.filters {
  margin: 1rem 0;
}
select {
  padding: 0.5rem;
}
</style>