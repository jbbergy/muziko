<template>
  <nav class="sidebar">
    <m-button-secondary @click="addFolder">Ajouter un dossier</m-button-secondary>
    <playlists />
  </nav>
</template>

<script lang="ts" setup>
import { selectDirectory } from '../../api/files'
import { create as LibraryCreate, getLibrary } from '../../api/library'
import MButtonSecondary from '../design-system/m-button/m-button.secondary.vue'
import Playlists from '../playlists/playlists.vue'
import { useLibraryStore } from '../../stores/library/library'

const libraryStore = useLibraryStore()

const name = "Sidebar";

async function addFolder() {
  let dir = null;
  try {
    dir = await selectDirectory();
  } catch (error) {
    console.error('addFolder error', error);
  }
  if (dir) {
    await LibraryCreate(dir[0])
    await libraryStore.refreshLibrary()
  }
}

</script>


<style lang="scss" scoped>
.sidebar {
  grid-area: nav;
  width: 21rem;
  background: $background-base;
  border-radius: 0.5rem;
}
</style>