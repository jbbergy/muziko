<template>
  <div class="m-progress-bar">
    <div class="m-progress-bar__time">{{ elapsedTime.m }}:{{ elapsedTime.s }}</div>
    <input
      :value="value"
      @input="setTime"
      type="range"
      step="0.1"
      min="0"
      max="100"
      class="m-progress-bar__control"
    />
    <div class="m-progress-bar__time">{{ fileDuration.m }}:{{ fileDuration.s }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const emits = defineEmits(["onSeek"]);

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
});

const fileDuration = computed(() => {
  return getFileDuration(props.duration);
});

const elapsedTime = computed(() => {
  return getFileDuration(props.currentTime);
});

function setTime(event: any) {
  emits("onSeek", (props.duration * (event.target.value / 100)));
}

function getFileDuration(duration) {
  const minuts = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return {
    m: minuts,
    s: seconds < 10 ? `0${seconds}` : seconds,
  };
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
  border-radius: 999px;

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
