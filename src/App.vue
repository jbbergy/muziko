<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getSettings } from './api/settings.api';
import { useGlobalStore } from './stores/global';

const store = useGlobalStore();

onMounted(async () => {
  store.settings = await getSettings();
});
</script>
