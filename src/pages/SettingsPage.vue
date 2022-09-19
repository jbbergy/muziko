<template>
  <table>
    <tr>
      <td>Chemin par défaut</td>
      <td>
        <input type="text" v-model="settingsData.defaultPath"/>
        <button @click="getDir">choose</button>
      </td>
    </tr>
  </table>
  <pre>
settingsData: {{ settingsData }}
  </pre>
</template>

<script setup lang="ts">
import { Settings } from '../types/nodes.type';
import { reactive, watch } from 'vue';
import { setSettings } from '../api/settings.api';
import { useGlobalStore } from '../stores/global';

const store = useGlobalStore();

const settingsData = reactive<Settings>(store.settings);

watch(
  settingsData,
  async function () {
    await setSettings(JSON.stringify(settingsData));
  },
  {
    deep: true,
  }
);

async function getDir() {
  const dir = await myApi.selectDirectory();
  if (dir?.length > 0) {
    settingsData.defaultPath = dir[0];
  }
}
</script>