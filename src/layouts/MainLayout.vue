<template>
  <q-layout view="lHh lpR lFf">

    <q-header reveal class="m-background-headline m-text-color-1">
      <q-toolbar>

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          Muziko
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="m-drawer-bg"
    >
      <m-items-list />
    </q-drawer>

    <q-page-container class="m-background text-white">
      <router-view />
    </q-page-container>

    <q-footer class="m-background-headline m-text-color-1">
      <m-player />
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import MItemsList from 'src/components/m-items-list/m-items-list.vue';
import MPlayer from 'src/components/m-player/m-player.vue';
import { ref } from 'vue';

const leftDrawerOpen = ref(true);
</script>