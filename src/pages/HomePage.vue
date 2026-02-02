<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RecipeService } from '@/services'
import { ROUTES } from '@/constants'
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'

const recipes = ref()

const fetchRecipes = async () => {
  try {
    recipes.value = await RecipeService.getRecipesByLetter()
  } catch (error) {
    console.error(error)
  }
}

const getRecipePath = (id: string) => {
  return `${ROUTES.RECIPE.split(':')[0]}${id}`
}

onMounted(fetchRecipes)
</script>

<template>
  <main>
    <AppLayout>
      <template #title> Recipes </template>

      <template #controls>
        <router-link :to="getRecipePath('new')">
          <AppButton text="Add recipe" /> </router-link
      ></template>
      <template #inner>
        <div class="wrapper">
          <el-table :data="recipes" style="width: 100%">
            <el-table-column prop="idMeal" label="#" />
            <el-table-column label="Image">
              <template #default="scope">
                <router-link :to="getRecipePath(scope.row.idMeal)"
                  ><img :src="scope.row.strMealThumb" class="img"
                /></router-link>
              </template>
            </el-table-column>
            <el-table-column prop="strArea" label="Area" />
            <el-table-column prop="strCategory" label="Category" />
            <el-table-column label="Tags">
              <template #default="scope">
                <template v-if="scope?.row?.strTags">
                  <el-tag
                    v-for="(tag, key) in scope.row.strTags.split(',')"
                    :key="key"
                    type="primary"
                    class="tag"
                  >
                    {{ tag }}
                  </el-tag>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </AppLayout>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as *;

.tag {
  margin: 2px 3px;
}

.img {
  width: 70px;
  height: 70px;
}
</style>
