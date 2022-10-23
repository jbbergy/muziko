<template>
  <div class="now-playing">
    <div class="now-playing__cover">
      <img src="../../assets/img/cover.jfif" alt="Cover" />
    </div>
    <div class="now-playing__title">
      <div class="now-playing__main-title">{{ trackTitle }}</div>
      <div class="now-playing__subtitle">{{ trackArtist }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAudioStore } from '../../stores/audio/audio'

const audioStore = useAudioStore()

const trackTitle = computed(() => {
  return audioStore.currentFile?.metadata?.title || audioStore.currentFile?.label
})
const trackArtist = computed(() => {
  return audioStore.currentFile?.metadata?.artist
})

</script>

<style lang="scss">
  .now-playing {
    display: flex;
    gap: 1rem;
    align-items: center;
    height: 100%;

    &__title {
      display: flex;
      gap: 0.25rem;
      flex-direction: column;
    }

    &__main-title {
      font-size: $now-playing-title;
      font-weight: 400;
    }

    &__subtitle {
      font-size: $now-playing-subtitle;
      color: $font-color-grey;
    }
  }
</style>