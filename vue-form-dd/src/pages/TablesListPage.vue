<template>
  <h1>Tables</h1>
  <TableList :tables="tables"/>
</template>

<script>
import TableList from '../components/TableList.vue';
import axios from 'axios';

export default {
name: "TablesListPage",
data() {
    return {
       tables: [],
    }
  },
  async created() {
    console.log("Hello world!!!");
    // const response = await axios.get('/api/products');
    let response = [];
    await axios.get('http://localhost:8080/api/complex_query')
    .then(res => {
      console.log('Resposta do servidor:', res.data);
      response = res;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });

    const tables_definitions = response.data;
    tables_definitions.forEach(element => {
      this.tables.push(element.table_metadata.table_name);
    });
  },
  components: { 
    TableList,
  }

}

</script>