<template>
  <div id="app" class='app'>
    <header>
      <PageHeader/>
    </header>
    <div class="content">
      <aside class="left_sidebar">
        <h2>Left Sidebar</h2>
        <NavBar />
      </aside>
      <main v-if="stateStore.selectedFunction !== 'Home'" class="main">
        <h2>Main Content</h2>
        <TablesListPage :db-name="dbName"/>
      </main>
      <aside v-if="stateStore.selectedFunction !== 'Home'" class="right_sidebar">
        <h2>Right Sidebar</h2>
      </aside>
    </div>
    <!-- <router-link to="tables">
        <button>Table Selection</button>
    </router-link>
    <router-link to="tables_description">
        <button>Table Description</button>
    </router-link> -->
  </div>
</template>

<script lang="ts">

import axios from 'axios';

import PageHeader from './pages/PageHeader.vue';
import NavBar from './pages/NavBar.vue'; 
import TablesListPage from './pages/TablesListPage.vue';
import { useStateStore } from './stores/stateStore'
import { dbStructStore } from './stores/dbStructStore';


export default {
  name: "App",
  setup() {
    const stateStore = useStateStore();
    stateStore.setFunction("Home");
    stateStore.$subscribe((mutation, state) => {
      console.log('Alteração detectada:', mutation.type, state.selectedFunction);
      // mutation.type mostra se foi direta ou via action
    });

    return { stateStore };
  },
  data(){
    return {
      landedInHome: () => { useStateStore().getFunction == "Home" },
      dbName: ""
    }
  },
  components: {
    PageHeader,
    NavBar,
    TablesListPage
  },
  async mounted() {
    let response: axios.AxiosResponse<any, any>;
    let databaseName: string = 'Database';
    await axios.get('http://localhost:8081/api/get_db_name')
      .then(res => {
        databaseName = res.data;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });

    dbStructStore().populate([], databaseName);
    this.dbName = databaseName;
    console.log(this.stateStore.getFunction);
  },
};
</script>

<style src="./styles/App.css" scoped>
</style>


