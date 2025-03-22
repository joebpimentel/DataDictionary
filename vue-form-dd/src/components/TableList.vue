<template>
  <h1>Tabelas de attributos</h1>
  <Vueform size="lg">
    <SelectElement
      class="selector-style"
      name="select"
      placeholder="Select a table"
      :native="false"
      :items="tables" />
  </Vueform>
</template>

<script>
export default {
  name: "TableList",
  props: {
    tables: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.selector-style {
  min-width: 400px;
  height: 50px;
  border: 2px solid red; /* Temporário para debug */
}
</style>