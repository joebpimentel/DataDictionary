<template>
    <h1>Tables selection</h1>
    <div v-if="tables.length > 0">
      <TransferList :tables="tables" />
      <!-- button class="checkout-button">Proceed to Checkout</button -->
    </div>
    <div v-if="tables.length === 0">
      You current have no items in your cart!
    </div>
</template>
  
<script>
import TransferList from '../components/TransferList.vue';
import { tables } from '../assets/mock/test_data.js';

  export default {
    name: "ShoppingCartPage",
    components: {
      TransferList,
    },
    data() {
      return {
        tables,
      }
    }
  }
  </script>