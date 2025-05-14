<template>
  <div class="catalog">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-title>Фильтры</v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="Категория"
                clearable
              />
              <v-range-slider
                v-model="priceRange"
                :max="maxPrice"
                label="Цена"
                thumb-label
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-text-field
            v-model="searchQuery"
            label="Поиск материалов"
            prepend-inner-icon="mdi-magnify"
          />

          <ProductGrid 
            :products="filteredProducts" 
            @add-to-cart="addToCart"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductGrid from '@/components/ProductGrid.vue'

export default {
  components: { ProductGrid },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
      searchQuery: '',
      priceRange: [0, 10000],
      maxPrice: 10000
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesCategory = !this.selectedCategory || 
          product.category.id === this.selectedCategory
        const matchesPrice = product.price >= this.priceRange[0] && 
          product.price <= this.priceRange[1]
        const matchesSearch = product.name.toLowerCase().includes(
          this.searchQuery.toLowerCase()
        )
        return matchesCategory && matchesPrice && matchesSearch
      })
    }
  },
  async created() {
    this.products = await this.$api.getProducts()
    this.categories = await this.$api.getCategories()
    this.maxPrice = Math.max(...this.products.map(p => p.price))
  },
  methods: {
    addToCart(product) {
      this.$store.commit('ADD_TO_CART', product)
    }
  }
}
</script>