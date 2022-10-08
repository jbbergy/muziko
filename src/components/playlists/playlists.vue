<template>
  <div class="playlists">
    <div
      v-for="library in libraries"
      :key="library.id"
      class="playlist__item"
    >
      {{ library.id }} - {{ library.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLibrary } from '../../api/library'
import { onMounted, ref } from 'vue'

const libraries = ref()

onMounted(async () => {
  try {
    libraries.value = await getLibrary()
  } catch (error) {
    console.error('playlists onMounted error', error)
  }
})
</script>
