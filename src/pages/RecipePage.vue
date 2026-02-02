<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { onMounted, ref } from 'vue'
import { RecipeService } from '@/services'

const route = useRoute()
const recipeId = route.params.id as string
const recipe = ref(RecipeService.getEmptyRecipe())
const recipeUpdated = ref(RecipeService.getEmptyRecipe())
const isCreatingMode = ref(true)

const fetchRecipe = async () => {
  try {
    const data = await RecipeService.getRecipesById(recipeId)
    recipe.value = data
    recipeUpdated.value = data
    isCreatingMode.value = false
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (parseInt(recipeId)) {
    fetchRecipe()
  }
})
</script>

<template>
  <main>
    <AppLayout>
      <template #title> {{ isCreatingMode ? 'New Recipe' : recipeUpdated.strMeal }} </template>
      <template #controls> <AppButton text="Save" /> </template>
      <template #inner> {{ recipeUpdated }}</template>
    </AppLayout>
  </main>
</template>
