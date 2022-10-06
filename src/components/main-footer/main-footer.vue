<template>
  <div class="main-footer">
    <div class="main-footer__right">
      <now-playing></now-playing>
    </div>
    <main-player></main-player>
    <div class="main-footer__left">
      <volume-control></volume-control>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MainPlayer from '../main-player/main-player.vue'
  import VolumeControl from '../volume-control/volume-control.vue'
  import NowPlaying from '../now-playing/now-playing.vue'
</script>

<style lang="scss" scoped>
  .main-footer {
    grid-area: player;
    height: 4.5rem;
    background: $dark;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }
</style>