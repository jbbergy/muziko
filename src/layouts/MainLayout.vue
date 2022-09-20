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
      <m-playlists />
      <button
        class="ds-button"
        @click="addFolder"
      >
        Ajouter un dossier
      </button>
      <button
        v-if="!currentUser"
        class="ds-button"
        @click="connectToSpotify"
      >
        Connecter Spotify
      </button>
      <template v-if="currentUser">
        Connecté avec le compte {{ currentUser.display_name }}<br>
        <img :src="currentUser.images[0].url" alt="Spotify user image"/>
      </template>
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
import { PROVIDERS } from 'app/src-electron/providers/providers.enum';
import { spotifyProviderInit } from 'app/src/api/providers/spotify.api';
import { getTokens } from 'src/api/settings.api';
import MPlaylists from 'src/components/m-playlists/m-playlists.vue';
import MPlayer from 'src/components/m-player/m-player.vue';
import { useGlobalStore } from 'src/stores/global';
import { computed } from 'vue';

const store = useGlobalStore();
const leftDrawerOpen = true;
let intervalId: NodeJS.Timeout | null = null;

const currentUser = computed(() => {
  return store.user;
});

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

async function connectToSpotify() {
  await spotifyProviderInit();
  intervalId = setInterval(async () => {
    const newToken = await getTokens(PROVIDERS.SPOTIFY);
    if (newToken) {
      store.addToken(newToken);
      clearInterval(intervalId);
    }
  }, 300);
}
</script>