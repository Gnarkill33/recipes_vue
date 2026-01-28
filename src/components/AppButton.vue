<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-button type="primary" class="btn">{{ text }}</el-button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as *;

.btn {
  padding: 20px 24px;
  font-size: 17px;
  border-radius: 4px;
  background-color: $violet;
}
</style>
