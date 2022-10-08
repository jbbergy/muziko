<template>
  <m-button
    :class="[
      'm-button m-button--secondary',
      props.isActive && 'm-button--is-active'
    ]"
    @click="onClick"
  >
    <slot></slot>
  </m-button>
</template>

<script lang="ts" setup>
import MButton from './m-button.vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

function onClick() {
  emit('click')
}
</script>

<style lang="scss" scoped>
.m-button {
  &--secondary {
    color: $font-color-light;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 999px;

    &:hover {
      color: darken($font-color-light, 20%);
    }
  }
}
</style>