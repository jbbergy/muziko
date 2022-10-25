<template>
  <m-button
    :class="[
      'm-button m-button--tertiary',
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
  &--tertiary {
    width: 100%;
    color: $font-color-light;
    background-color: $button-background-tertiary;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid $button-background-tertiary;
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      color: darken($font-color-light, 20%);
      background-color: darken($button-background-tertiary, 15%);
    }
  }
}
</style>