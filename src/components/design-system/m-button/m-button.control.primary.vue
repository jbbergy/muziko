<template>
  <m-button class="m-button-control m-button-control--primary">
    <slot></slot>
  </m-button>
</template>

<script lang="ts" setup>
import MButton from './m-button.vue'
</script>

<style lang="scss" scoped>
.m-button {
  &-control {
    &--primary {
      background-color: $background-light;
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      color:$font-color-dark;

      &:hover {
        transform: scale(1.06);
      }
    }
  }
}
</style>