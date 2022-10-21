<template>
  <div class="playlists">
    <m-tree :library="libraryStore.library" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useLibraryStore } from '../../stores/library/library'
import MTree from '../design-system/m-tree/m-tree.vue'
const libraryStore = useLibraryStore()

onMounted(async () => {
  try {
    await libraryStore.refreshLibrary()
  } catch (error) {
    console.error('playlists onMounted error', error)
  }
})
</script>
