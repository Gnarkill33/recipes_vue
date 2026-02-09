<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(true)
</script>

<template>
  <transition>
    <div class="root" v-show="isLoading">
      <div class="header">Loading...</div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as *;

.root {
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($white, 0.8);
}

.header {
  font-size: 28px;
  font-weight: 700;
}
</style>
