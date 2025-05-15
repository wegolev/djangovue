<template>
    <div class="home">
      <v-container>
        <v-carousel cycle height="400">
          <v-carousel-item
            v-for="(promo, i) in promotions"
            :key="i"
            :src="promo.image"
            cover
          >
            <div class="promo-text">
              <h2>{{ promo.title }}</h2>
              <p>{{ promo.description }}</p>
            </div>
          </v-carousel-item>
        </v-carousel>
  
        <v-row class="mt-8">
          <v-col cols="12">
            <h2 class="text-h4 mb-4">Популярные товары</h2>
            <ProductGrid :products="featuredProducts" />
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
        promotions: [
          {
            title: 'Скидка на щебень 15%',
            description: 'Только до конца месяца',
            image: '/promo1.jpg'
          },
          {
            title: 'Бесплатная доставка',
            description: 'При заказе от 10 тонн',
            image: '/promo2.jpg'
          }
        ],
        featuredProducts: [] // Заполняется из API
      }
    },
    async created() {
      this.featuredProducts = await this.$api.getFeaturedProducts()
    }
  }
  </script>