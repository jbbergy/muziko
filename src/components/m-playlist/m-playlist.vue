<template>
  <q-list
    v-if="filesList"
    bordered
    separator
  >
    <q-item 
      clickable
      v-ripple
      v-for="file in filesList"
      :key="file.uuid"
      @dblclick="selectAudioFile(file)"
    >
      <q-item-section>{{ file.name }}</q-item-section>
    </q-item>
  </q-list>
  <q-banner v-else rounded>
    No files found
  </q-banner>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from 'src/stores/global';
import { TreeItem } from 'src/types/nodes.type';
import { listFilesFromDirectory } from 'src/api/api';

const store = useGlobalStore();
let selected = computed(() => store.selectedItem);
let filesList = computed(() => store.filesList);

function selectAudioFile(file: TreeItem) {
  store.fileToPlay = file;
  file.isPlaying = true;
  if (!store.queue) {
    store.queue = [] as TreeItem[];
  }
  store.queue?.push(file);
}

watch(selected, async function (value: TreeItem) {
  if (value?.isDir) {
    const files = await listFilesFromDirectory(value?.path);
    if (files?.length > 0) {
      store.filesList = files;
    } else {
      store.filesList = null;
    }
  }
});
</script>

<style lang="scss" scoped>
.q-list {
  width: 100%;
}
.q-banner {
  width: fit-content;
  height: fit-content;
  margin: auto;
  color: $dark;
}
</style>

