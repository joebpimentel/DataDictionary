<template>
    <h1>Tables Description</h1>
    <div v-if="schemas.length > 0">
      <!-- <TablesList :schemas="schemas" /> -->
      <TreeViewComponent :treeRoot="treeRoot" />
      <!-- button class="checkout-button">Proceed to Checkout</button -->
    </div>
</template>

<script lang="ts">
import axios from 'axios';

import { DBElement, Schema, SchemaResponseType, Table, TableAttribute, TableResponseType } from '../types/DBTypes';

import TablesList from '../components/TablesList.vue';
import DBEntitiesTreeView from '../components/DBEntitiesTreeView.vue';
import { ITreeNode, Tree, TreeNode } from '../types/TreeViewTypes';
import { dbStructStore } from '../stores/dbStructStore';
import TreeViewComponent from '../components/tree_view/TreeViewComponent.vue';

export default {
  name: "TablesListPage",
  props: {
    dbName: {
      type: String,
      requeired: true
    }
  },
  components: {
    TablesList,
    DBEntitiesTreeView,
    TreeViewComponent
  },
  data() {
    return {
      schemas: [{ schema_metadata: { schema_name: 'None', table_comment: 'Placeholder' } }] as Array<SchemaResponseType>,
      treeRoot: dbStructStore().$state.definitionTree.getRoot() as ITreeNode<DBElement>
    }
  },
  async mounted() {
    let response: axios.AxiosResponse<any, any>;
    const dbStoreDefTree = dbStructStore().$state.definitionTree;

    const schemaNodes = new Array<ITreeNode<DBElement>>();
    await axios.get('http://localhost:8081/api/get_db_schemas')
      .then(res => {
        console.log('Resposta do servidor:', res.data);
        response = res;
        
        const schemas_list = response.data;
        schemas_list.forEach((element: SchemaResponseType) => {
          this.schemas.push(element);
          schemaNodes.push(new TreeNode(
            element.schema_metadata.schema_name,
            { name: element.schema_metadata.schema_name, description: element.schema_metadata.table_comment } as Schema,
            null));
        });
      })
      .catch(error => {
        console.error(`Erro na requisição de esquemas do banco de dados:  ${this.dbName} => `, error);
      });

    for (const schema of schemaNodes) {
      await axios.get(`http://localhost:8081/api/${schema.name}/get_table_definitions`)
      .then(res => {
        console.log('Resposta do servidor:', res.data);
        response = res;
        const tables_list = response.data as Array<TableResponseType>;
        tables_list.forEach((table: TableResponseType) => {
          schema.children.push(new TreeNode(
            table.table_metadata.table_name,
            { name: table.table_metadata.table_name, attributes: new Array<TableAttribute>() } as Table,
            schema
          ))
        })
      })
      .catch(error => {
        console.error(`Erro na requisição de tabelas do esquema: ${schema.name} => `, error);
      });
    }

    dbStoreDefTree.addChildren(this.dbName as string, schemaNodes);

    console.log("dbStoreDefTree", dbStoreDefTree);
    // await axios.get('http://localhost:8081/api/get_table_definitions')
    // .then(res => {
    //   console.log('Resposta do servidor:', res.data);
    //   response = res;

    // const tables_definitions = response.data;
    // tables_definitions.forEach(element => {
    //   this.tables.push(element);
    // });

    // })
    // .catch(error => {
    //   console.error('Erro na requisição:', error);
    // });
  },
}

</script>