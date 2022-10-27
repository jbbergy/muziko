<template>
  <div class="m-tree">
    <ul class="m-tree__list">
      <li
        class="m-tree__list-item"
        v-for="libraryItem in library"
        :key="libraryItem.uuid"
      >
        <m-tree-item
          :item="libraryItem"
          :is-selected="openedItems[libraryItem.uuid]"
          @click="selectFolder"
        />
        <template v-if="libraryItem.children.length > 0 && openedItems[libraryItem.uuid]">
          <m-tree :library="libraryItem.children" :parent-folder-id="libraryItem.uuid" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAudioStore } from "../../../stores/audio/audio";
import { listFilesFromDirectory } from "../../../api/files"
import MTreeItem from '../m-tree-item/m-tree-item.vue'

const fetching = ref()
const audioStore = useAudioStore();
const openedItems = ref({})

const props = defineProps({
  library: {
    type: Array,
    default: [],
  },
  parentFolderId: {
    type: String,
    default: null,
  },
});

async function selectFolder(item) {
  if (audioStore.selectedFolder?.path === item.folder.path) return
  if (fetching.value === item.folder.path) return
  audioStore.isLoadingFiles = true
  fetching.value = item.folder.path
  audioStore.autoPlay = item.autoPlay

  if (!props.parentFolderId) {
    openedItems.value = {}
  }
  Object.keys(openedItems.value)?.forEach((key) => {
    if (openedItems.value[key] === props.parentFolderId) {
      delete openedItems.value[key]
    }
  })
  openedItems.value[item.folder.uuid] = props.parentFolderId || true
  audioStore.selectedFolder = item.folder

  try {
    audioStore.currentPlaylist = await listFilesFromDirectory(item.folder.path)
    fetching.value = null
  } catch (error) {
    console.error('m-tree/selectFolder error', error)
  } finally {
    setTimeout(() => {
      audioStore.isLoadingFiles = false
    }, 300);
  }
}

</script>

<style lang="scss">
.m-tree {
  color: $font-color-light;
  user-select: none;

  &__list {
    list-style: none;
    padding-inline-start: $playlists-default-margin;
  }
}
</style>
