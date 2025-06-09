<template>
    <h1>Tables Description</h1>
    <div v-if="schemas.length > 0">
      <TablesList :schemas="schemas" />
      <!-- button class="checkout-button">Proceed to Checkout</button -->
    </div>
</template>

<script>
import axios from 'axios';
import TablesList from '../components/TablesList.vue';

  export default {
    name: "TablesListPage",
    components: {
      TablesList,
    },
    data() {
      return {
        schemas: [ { schema_metadata: { schema_name: 'None', table_comment: 'Placeholder'} }],
      }
    },
    async mounted() {
      let response = [];

      await axios.get('http://localhost:8081/api/get_db_schemas')
      .then(res => {
        console.log('Resposta do servidor:', res.data);
        response = res;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });

      const schemas_list = response.data;
      schemas_list.forEach(element => {
        this.schemas.push(element);
      });

      
      // await axios.get('http://localhost:8081/api/get_table_definitions')
      // .then(res => {
      //   console.log('Resposta do servidor:', res.data);
      //   response = res;
      // })
      // .catch(error => {
      //   console.error('Erro na requisição:', error);
      // });

      // const tables_definitions = response.data;
      // tables_definitions.forEach(element => {
      //   this.tables.push(element);
      // });
   },
  }

</script>