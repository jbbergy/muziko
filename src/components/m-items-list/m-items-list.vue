<template>
  <q-tree
    v-if="nodes"
    :nodes="nodes"
    node-key="uuid"
    no-connectors
    v-model:selected="selected"
    @update:selected="onSelect"
  />
</template>

<script setup lang="ts">
import { findNestedObj } from '../../utils/findNestedObj';
import { getLibrary } from '../../api/api';
import { TreeItem } from '../../types/nodes.type';
import { ref, onMounted, computed } from 'vue';
import { useGlobalStore } from 'src/stores/global';

const store = useGlobalStore();

let selected = ref<TreeItem>({} as TreeItem);

function onSelect(evt: string) {
  if (!nodes.value) return;
  const foundItem = findNestedObj(nodes.value, 'uuid', evt);
  store.selectedItem = foundItem;
}

const nodes: TreeItem[] = computed(() => store.library);

onMounted(async () => {
  if (store.settings?.defaultPath) {
    store.library = await getLibrary();
  }
});
</script>
