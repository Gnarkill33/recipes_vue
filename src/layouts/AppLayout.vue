<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
</script>

<template>
  <div class="root">
    <div class="menu">
      <AppMenu />
    </div>
    <main></main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss';
</style>
