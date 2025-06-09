<template>
    <h1>Tables Description</h1>
    <div v-if="tables.length > 0">
      <TableDescriptionList :tables="tables" />
      <!-- button class="checkout-button">Proceed to Checkout</button -->
    </div>
    <div v-if="tables.length === 0">
      You current have no items in your cart!
    </div>
</template>
  
<script lang="ts">
import TableDescriptionList from '../components/TableDescriptionList.vue';
// import { tables } from '../assets/mock/test_data.js';
import axios from 'axios';

  export default {
    name: "TablesDescriptionPage",
    components: {
      TableDescriptionList,
    },
    data() {
      return {
        tables: [],
      }
    },
    async created() {
      // const response = await axios.get('/api/products');
      let response = [];
      await axios.get('http://localhost:8081/api/complex_query')
      .then(res => {
        console.log('Resposta do servidor:', res.data);
        response = res;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });

      const tables_definitions = response.data;
      tables_definitions.forEach(element => {
        this.tables.push(element);
      });
   },
  }
  </script>