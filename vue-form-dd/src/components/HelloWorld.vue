<template>
  <h1>Tabelas de attributos</h1>
  <ProductsList :tab="products"/>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'HelloWorld',
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await axios.get('/api/products');
    const products = response.data;
    this.products = products;
  }
}
</script>
