<template>
  <nav class="sidebar custom-scrollbar">
    <div class="sidebar__actions">
      <m-button-tertiary @click="addFolder">Ajouter un dossier</m-button-tertiary>
    </div>
    <playlists />
  </nav>
</template>

<script lang="ts" setup>
import { selectDirectory } from '../../api/files'
import { create as LibraryCreate, getLibrary } from '../../api/library'
import MButtonTertiary from '../design-system/m-button/m-button.tertiary.vue'
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
  overflow-x: hidden;
  overflow-y: auto;

  &__actions {
    width: 100%;
    padding: 0.5rem;
  }
}
</style>