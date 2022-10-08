<template>
  <m-button
    :class="[
      'm-button m-button--primary',
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
  &--primary {
    color: $font-color-light;
    background-color: $button-background-primary;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    
    &:hover {
      box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.5);
    }
  }
}
</style>