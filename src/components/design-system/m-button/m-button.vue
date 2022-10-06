<template>
  <button class="m-button" type="button" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<style lang="scss" scoped>
.m-button {
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>