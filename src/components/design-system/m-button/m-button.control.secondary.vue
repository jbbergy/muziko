<template>
  <m-button
    :class="[
      'm-button-control m-button-control--secondary',
      props.isActive && 'm-button-control--is-active'
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
  &-control {
    &--secondary {
      background-color: transparent;
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      color:$font-color-light;

      :deep(svg) {
        fill: $button-background-secondary;
        stroke: $button-background-secondary;
      }

      &:hover {
        :deep(svg) {
          fill: $font-color-light;
          stroke: $font-color-light;
        }
      }
    }

    &--is-active {

      &:after {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 999px;
        background-color: $font-color-accent;
        position: absolute;
        transform: translateY(0.90rem);
      }

      :deep(svg) {
        fill: $font-color-accent;
        stroke: $font-color-accent;
      }
    }
  }
}
</style>