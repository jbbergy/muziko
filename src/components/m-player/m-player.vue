<template>
  <div class="m-player">
    <audio :src="fileToPlay" controls autoplay />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from 'src/stores/global';

const store = useGlobalStore();
const fileToPlay = computed(() => store.fileToPlay);
</script>

<style lang="scss">
.m-player {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>