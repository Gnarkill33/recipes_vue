<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
  circle: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-button v-if="!circle" type="primary" class="btn">{{ text }}</el-button>
  <el-button v-else circle :icon="icon" type="primary" class="circle" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as *;

.btn {
  padding: 20px 24px;
  font-size: 17px;
  border-radius: 4px;
  background-color: $violet;
}

.circle {
  font-size: 16px;
  background-color: $violet;
  border: none;
}
</style>
