import { defineStore } from 'pinia'

export const useStateStore = defineStore('sessionState', {
  // Estado (dados reativos)
  state: () => ({
    selectedFunction: "" as string,
  }),
  
  // Getters (computados)
  getters: {
    getFunction: (state) => state.selectedFunction,
  },
  
  // Actions (métodos)
  actions: {
    setFunction(value: string) {
      this.selectedFunction = value
    },
  }
})

export type SessionStateStoreType = typeof useStateStore;