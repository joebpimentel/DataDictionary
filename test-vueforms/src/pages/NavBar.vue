<template>
  <aside class="navbar">
    <h2>Opções</h2>
    <nav class="navigation">
      <ul>
        <li @click="goHome"><a href="#">Home</a></li>
        <li @click="goDataDictionary"><a href="#">Database data dictonary</a></li>
        <li @click="goUIDictionary"><a href="#">User Interface data dictonary</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { useStateStore } from '../stores/stateStore.js'

export default {
    name: "NavBar",
    data() {
      return {
      }
    },
    methods: {
      async goHome() {
        const stateStore = useStateStore();
        stateStore.setFunction("Home");
        const currentFunction =stateStore.getFunction;
        const message = 'Go ' + currentFunction + '!';
        console.log(message);
      },
      async goDataDictionary() {
        const stateStore = useStateStore();
        stateStore.setFunction("DataDictionary");
        const currentFunction = stateStore.getFunction;
        const message = 'Go ' + currentFunction + '!';
        console.log(message);
      },
      async goUIDictionary() {
        const stateStore = useStateStore();
        stateStore.setFunction("UIDictionary");
        const currentFunction =stateStore.getFunction;
        const message = 'Go ' + currentFunction + '!';
        console.log(message);
      },
    }
}
</script>

<style scoped>
@import url('../styles/NavBar.css');
</style>
