<template>
  <q-layout view="LHh LpR LFf">

    <q-header class="ds-header">
      <q-toolbar>

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          <span class="ds-title-1">
            Muziko
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      class="ds-drawer"
    >
      <router-link to="/settings">
        <button
          class="ds-button ds-button--secondary ds-button--control ds-button--control-small"
        >
          <img src="../assets/icons/btn-settings.svg" alt="settings button" />
        </button>
      </router-link>
      <m-items-list />
      <button
        class="ds-button"
        @click="addFolder"
      >
        Ajouter un dossier
      </button>
    </q-drawer>

    <q-page-container class="ds-content-main">
      <router-view />
    </q-page-container>

    <q-footer class="ds-player">
      <m-player />
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import MItemsList from 'src/components/m-items-list/m-items-list.vue';
import MPlayer from 'src/components/m-player/m-player.vue';
import { useGlobalStore } from 'src/stores/global';
import { Library } from 'src/types/nodes.type';
import { reactive, ref } from 'vue';

const store = useGlobalStore();
const leftDrawerOpen = ref(true);
const libraryData = reactive<Library>(store.library);

async function addFolder() {
  let dir = null;
  try {
    dir = await myApi.selectDirectory();
  } catch (error) {
    console.error('addFolder error', error);
  }

  if (dir) {
    store.library = await myApi.addDirectory(dir[0]);
  }
}
</script>