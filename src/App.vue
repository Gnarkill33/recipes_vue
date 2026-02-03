<script setup lang="ts">
import { onMounted } from 'vue'
import { useRootStore } from './stores/root'
import { RouterView } from 'vue-router'

const rootStore = useRootStore()

onMounted(() => {
  rootStore.getInfo('areas')
  rootStore.getInfo('categories')
  rootStore.getInfo('ingredients')
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss';
</style>
