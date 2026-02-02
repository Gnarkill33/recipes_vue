<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { onMounted, ref } from 'vue'
import { RecipeService } from '@/services'

const route = useRoute()
const recipeId = route.params.id as string
const recipe = ref()

const fetchRecipe = async () => {
  try {
    recipe.value = await RecipeService.getRecipesById(recipeId)
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
      <template #title> Recipe </template>
      <template #controls> <AppButton text="Save" /> </template>
      <template #inner> </template>
    </AppLayout>
  </main>
</template>
