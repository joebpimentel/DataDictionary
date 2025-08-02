<template>
  <div id="app" class="app">
    <header class="header">
      <PageHeader/>
    </header>
    <div class="content">
      <aside class="left_sidebar">
        <h2>Left Sidebar</h2>
        <NavBar />
      </aside>
      <main v-if="stateStore.selectedFunction !== 'Home'" class="main">
        <h2>Main Content</h2>
        <TablesListPage />
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
import PageHeader from './pages/PageHeader.vue';
import NavBar from './pages/NavBar.vue'; 
import TablesListPage from './pages/TablesListPage.vue';
import { useStateStore } from './stores/stateStore'

let stateStore = null;

export default {
  name: "App",
  setup() {
    stateStore = useStateStore();
    stateStore.setFunction("Home");
    stateStore.$subscribe((mutation, state) => {
      console.log('Alteração detectada:', mutation.type, state.selectedFunction);
      // mutation.type mostra se foi direta ou via action
    });

    return { stateStore };
  },
  data(){
    return {
      landedInHome: () => { useStateStore.getFunction == "Home" },
    }
  },
  components: {
    PageHeader,
    NavBar,
    TablesListPage
  },
  mounted() {
    console.log(stateStore.getFunction);
  },
};
</script>

<style src="@/styles/App.css" scoped></style>
