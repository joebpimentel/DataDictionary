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
  
<script lang="ts">
import { tables } from '../assets/mock/test_data';
import TransferList from '../components/TransferList.vue';

  export default {
    name: "TablePage",
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