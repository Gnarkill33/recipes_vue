import axios from 'axios'
import { URL_AREAS, URL_INGREDIENTS, URL_CATEGORIES } from '@/constants'

export const getDetails = async (details: string) => {
  let path
  switch (details) {
    case 'areas': {
      path = URL_AREAS
      break
    }
    case 'ingredients': {
      path = URL_INGREDIENTS
      break
    }
    case 'categories': {
      path = URL_CATEGORIES
      break
    }
    default: {
      path = URL_AREAS
    }
  }
  const data = await axios.get(path)

  return data?.data.meals
}
