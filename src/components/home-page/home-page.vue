<template>
  <div class="main-view">
    mainview
    {{ audioStore.currentPlaylist }}
  </div>
</template>

<script lang="ts" setup>
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();

</script>
