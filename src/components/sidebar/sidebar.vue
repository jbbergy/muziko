<template>
  <nav class="sidebar">
    <m-button-secondary>Ajouter un dossier</m-button-secondary>
    <playlists />
  </nav>
</template>

<script lang="ts" setup>
import MButtonSecondary from '../design-system/m-button/m-button.secondary.vue'
import Playlists from '../playlists/playlists.vue'

const name = "Sidebar";
</script>


<style lang="scss" scoped>
.sidebar {
  grid-area: nav;
  width: 21rem;
  background: $background-base;
  border-radius: 0.5rem;
}
</style>