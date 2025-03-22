<template>
  <div class="nav-bar">
    <div class="vue">
      <img :src="vue" />
    </div>
    <div class="nav-buttons-wrap">
      <!-- <button @click="signOut" v-if="user">Sign Out</button> -->
      <router-link to="/tables">
        <button class="button">Tables</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import vue from '../assets/vue.svg';

export default {
  name: "NavBar",
  data() {
    return {
      vue,
    }
  },
}
</script>

<style>

</style>