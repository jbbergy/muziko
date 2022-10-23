<template>
  <div class="volume-control">
    <m-range @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import MRange from '../design-system/m-range/m-range.vue'
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();

function onInput(volume) {
  if (audioStore.currentInstance) {
    audioStore.currentVolume = volume
    audioStore.currentInstance.setVolume(audioStore.currentVolume);
  }
}

</script>

<style lang="scss">
  .volume-control {
    color: $font-color-light;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    .m-range {
      width: 10rem;
    }
  }
</style>