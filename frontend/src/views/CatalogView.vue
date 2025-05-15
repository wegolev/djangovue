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
                :items="categoryOptions"
                item-text="name"
                item-value="id"
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

          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="primary"
            class="my-4"
          />

          <ProductGrid 
            v-else
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
      selectedCategory: null,
      searchQuery: '',
      priceRange: [0, 10000],
      isLoading: false
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    categories() {
      return this.$store.state.categories
    },
    categoryOptions() {
      return this.categories.map(cat => ({
        id: cat.id,
        name: cat.name
      }))
    },
    maxPrice() {
      return this.products.length 
        ? Math.max(...this.products.map(p => p.price))
        : 10000
    },
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
    this.isLoading = true
    try {
      await Promise.all([
        this.$store.dispatch('loadProducts'),
        this.$store.dispatch('loadCategories')
      ])
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit('ADD_TO_CART', {
        ...product,
        quantity: 1
      })
    }
  }
}
</script>