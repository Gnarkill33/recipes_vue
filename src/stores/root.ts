import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', () => {
  const areas = ref(null)
  const categories = ref(null)
  const ingredients = ref(null)

  return { areas, ingredients, categories }
})
