<!-- <template>
  <div>
    <Vueform>
      <TextElement name="hello_world" label="Hello" placeholder="World" />
    </Vueform>
  </div>
</template> -->

<template>
  <div id="app">
    <TablesPage />
  </div>
</template>

<script>
// import MyForm from './components/MyForm.vue';
import TablesPage from './pages/TablesPage.vue';

export default {
  components: {
    TablesPage
  }
};
</script>
