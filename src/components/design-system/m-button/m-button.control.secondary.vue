<template>
  <m-button class="m-button-control m-button-control--secondary">
    <slot></slot>
  </m-button>
</template>

<script lang="ts" setup>
import MButton from './m-button.vue'
</script>

<style lang="scss" scoped>
.m-button {
  &-control {
    &--secondary {
      background-color: transparent;
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      color:$font-color-light;

      :deep(svg) {
        fill: $font-color-light;
        stroke: $font-color-light;
      }
    }
  }
}
</style>