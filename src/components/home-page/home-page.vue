<template>
  <div class="main-view">
    <files-list v-if="audioStore.selectedFolder" />
  </div>
</template>

<script lang="ts" setup>
import FilesList from '../files-list/files-list.vue'
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();
</script>
