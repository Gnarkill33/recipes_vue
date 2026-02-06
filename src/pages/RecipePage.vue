<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { onMounted, ref, computed } from 'vue'
import { RecipeService, CommonService } from '@/services'
import { useRootStore } from '@/stores/root'

const route = useRoute()
const rootStore = useRootStore()
const recipeId = route.params.id as string
const recipe = ref(RecipeService.getEmptyRecipe())
const recipeUpdated = ref(RecipeService.getEmptyRecipe())
const isCreatingMode = ref(true)
const recipeIngredients = ref([CommonService.getEmptyIngredient()])
const areas = computed(() => rootStore.areas)
const categories = computed(() => rootStore.categories)

const fetchRecipe = async () => {
  try {
    const data = await RecipeService.getRecipesById(recipeId)
    recipe.value = { ...data }
    recipeUpdated.value = { ...data }
    isCreatingMode.value = false
  } catch (error) {
    console.error(error)
  }
}

const normalizeRecipeInredients = () => {
  const normalizedIngredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof typeof recipe.value
    const ingredientMeasure = `strMeasure${i}` as keyof typeof recipe.value
    if (recipe.value[ingredientKey]) {
      const ingredient = {
        id: Math.random().toString(36).slice(2),
        title: recipe.value[ingredientKey],
        measure: recipe.value[ingredientMeasure] || '',
      }

      normalizedIngredients.push(ingredient)
    }
  }
  recipeIngredients.value = normalizedIngredients
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const denormalizeIngredients = (recipe: any) => {
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeIngredients.value[i - 1]

    if (ingredient?.title && ingredient?.measure) {
      recipe[`strIngredient${i}`] = ingredient.title
      recipe[`strMeasure${i}`] = ingredient.measure
    } else {
      recipe[`strIngredient${i}`] = ''
      recipe[`strMeasure${i}`] = ''
    }
  }
}

const addIngredient = () => {
  recipeIngredients.value.push(CommonService.getEmptyIngredient())
}

const deleteIngredient = (index: number) => {
  recipeIngredients.value.splice(index, 1)
}

const createOrUpdateRecipe = () => {
  if (isCreatingMode.value) {
    createRecipe()
  } else {
    updateRecipe()
  }
}

const createRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }
    denormalizeIngredients(params)

    await RecipeService.createRecipe()
  } catch (error) {
    console.error(error)
  }
}

const updateRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }
    denormalizeIngredients(params)

    await RecipeService.updateRecipe()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if (parseInt(recipeId)) {
    await fetchRecipe()
    normalizeRecipeInredients()
  }
})
</script>

<template>
  <main>
    <AppLayout>
      <template #title> {{ isCreatingMode ? 'New Recipe' : recipeUpdated.strMeal }} </template>
      <template #controls> <AppButton text="Save" @onClick="createOrUpdateRecipe" /> </template>
      <template #inner>
        <div class="wrapper">
          <div class="row">
            <div class="col">
              <div class="label">Title</div>
              <el-input v-model="recipeUpdated.strMeal" placeholder="Title" />
            </div>
            <div class="col">
              <div class="label">Area</div>
              <el-select v-model="recipeUpdated.strArea" placeholder="Area">
                <el-option
                  v-for="item in areas"
                  :key="item.strArea"
                  :label="item.strArea"
                  :value="item.strArea"
                />
              </el-select>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="label">Category</div>
              <el-select v-model="recipeUpdated.strCategory" placeholder="Category">
                <el-option
                  v-for="item in categories"
                  :key="item.strCategory"
                  :label="item.strCategory"
                  :value="item.strCategory"
                />
              </el-select>
            </div>
          </div>
          <div class="ingredients">
            <div class="subtitle">Ingredients</div>
            <div
              v-for="(ingredient, index) in recipeIngredients"
              :key="`${ingredient.id}-${index}`"
              class="row align-items-flex-end"
            >
              <div class="col col-sm mb-2">
                {{ index + 1 }}
              </div>
              <div class="col">
                <div class="label">Measure</div>
                <el-input v-model="recipeIngredients[index]!.measure" placeholder="Measure" />
              </div>
              <div class="col">
                <div class="label">Title</div>
                <el-input v-model="recipeIngredients[index]!.title" placeholder="Title" />
              </div>
              <div class="col col-sm mb-2">
                <AppButton circle icon="Delete" @click="() => deleteIngredient(index)"></AppButton>
              </div>
            </div>
            <AppButton text="Add ingredient" @click="addIngredient"></AppButton>
          </div>
          <div class="row">
            <div class="col">
              <div class="subtitle">Instructions</div>
              <el-input
                v-model="recipeUpdated.strInstructions"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Instructions"
              />
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </main>
</template>

<style lang="scss" scoped>
.ingredients {
  padding-bottom: 16px;
}

.mb-2 {
  margin-bottom: 4px;
}
</style>
