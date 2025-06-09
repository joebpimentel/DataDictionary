import { defineStore } from 'pinia'

export const useStateStore = defineStore('sessionState', {
  // Estado (dados reativos)
  state: () => ({
    selectedFunction: "",
  }),
  
  // Getters (computados)
  getters: {
    getFunction: (state) => state.selectedFunction,
  },
  
  // Actions (métodos)
  actions: {
    setFunction(value) {
      this.selectedFunction = value
    },
  }
})
