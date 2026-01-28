<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
</script>

<template>
  <main>
    <AppLayout>
      <template #title> Recipes </template>
      <template #controls> <AppButton text="Add recipe" /> </template>
    </AppLayout>
  </main>
</template>
