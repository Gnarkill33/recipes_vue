import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CommonService } from '@/services'

export const useRootStore = defineStore('root', () => {
  const areas = ref(null)
  const categories = ref(null)
  const ingredients = ref(null)

  async function getInfo(infoType: string) {
    const data = await CommonService.getDetails(infoType)

    if (infoType === 'areas') {
      areas.value = data
    } else if (infoType === 'categories') {
      categories.value = data
    } else if (infoType === 'ingredients') {
      ingredients.value = data
    }
  }
  return { areas, ingredients, categories, getInfo }
})
