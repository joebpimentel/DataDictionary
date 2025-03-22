<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Aqui você pode adicionar a lógica para enviar o formulário
        console.log('Form submitted:', this.form);
      }
    }
  };
  </script>