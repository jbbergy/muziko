<template>
  <q-list bordered separator>
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
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from 'src/stores/global';
import { TreeItem } from 'src/types/nodes.type';
import { listFilesFromDirectory } from 'src/api/api';

const store = useGlobalStore();
let selected = computed(() => store.selectedItem);
let filesList = ref<TreeItem[]>();

function selectAudioFile(file: TreeItem) {
  store.fileToPlay = file.path;
}

watch(selected, async function (value: TreeItem, oldValue: TreeItem) {
  if (value?.isDir) {
    const files = await listFilesFromDirectory(value?.path);
    if (files?.length > 0) {
      filesList.value = files;
    }
  }
});
</script>

<style lang="scss" scoped>
.q-list {
  width: 100%;
}
</style>

