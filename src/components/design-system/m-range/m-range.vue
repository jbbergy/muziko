<template>
  <div class="m-range">
    <input
      value="0.3"
      type="range"
      step="0.01"
      min="0"
      max="1"
      class="m-range__control"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>

const emits = defineEmits(['input'])

function onInput(event) {
  emits('input', event.target.value)
}

</script>

<style lang="scss">
.m-range {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &__time {
    color: $font-color-light;
  }

  &__control {
    width: 100%;
    -webkit-appearance: none;
    background: transparent;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 0.75rem;
      width: 0.75rem;
      border-radius: 999px;
      transform: translateY(-0.25rem);
      background-color: $font-color-accent;
    }

    &::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      height: 0.25rem;
      background-color: $background-progress-bar;
      border-radius: 999px;
    }

    &:hover {
      &::-webkit-slider-thumb {
        background-color: $background-progress-bar-hover;
      }
    }
  }
}
</style>