<template>
  <div class="volume-control">
    <m-range @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import MRange from '../design-system/m-range/m-range.vue'

function onInput(event) {
  console.log('onInput', event)
}

</script>

<style lang="scss">
  .volume-control {
    color: $font-color-light;
  }
</style>