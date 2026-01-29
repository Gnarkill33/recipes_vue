<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RecipeService } from '@/services'
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'

const recipes = ref()

const fetchRecipes = async () => {
  try {
    recipes.value = await RecipeService.getRecipesByLetter()
  } catch {}
}

onMounted(fetchRecipes)
</script>

<template>
  <main>
    <AppLayout>
      <template #title> Recipes </template>
      <template #controls> <AppButton text="Add recipe" /> </template>
      <template #inner> {{ recipes }} </template>
    </AppLayout>
  </main>
</template>
