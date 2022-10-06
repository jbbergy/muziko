<template>
  <div class="m-progress-bar">
    <div class="m-progress-bar__time">0:00</div>
    <input
      :value="currentTime"
      @input="setTime"
      type="range"
      step="0.1"
      min="0"
      max="100"
      class="m-progress-bar__control"
    />
    <div class="m-progress-bar__time">2:54</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentTime = ref(0)

function setTime(event: any) {
  currentTime.value = event.target.value
}
</script>

<style lang="scss" scoped>
  .m-progress-bar {
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