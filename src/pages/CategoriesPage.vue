<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
</script>

<template>
  <main>
    <AppLayout>
      <template #title> Categories </template>
      <template #controls> <AppButton text="Add category" /> </template>
      <template #inner> </template>
    </AppLayout>
  </main>
</template>
