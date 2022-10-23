<template>
  <div class="m-tree">
    <ul class="m-tree__list">
      <li
        :class="[
          'm-tree__list-item',
          openedItems[libraryItem.uuid] && 'm-tree__list-item--open',
        ]"
        v-for="libraryItem in library"
        :key="libraryItem.uuid"
      >
        <div :class="[
          'status-indicator',
          openedItems[libraryItem.uuid] && 'status-indicator--open'
          ]"
        />
        <span
          class="m-tree__list-itemtext"
          @click="selectFolder(libraryItem)"
        >
          {{ libraryItem.label }}
        </span>
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


async function selectFolder(folder) {

  if (!props.parentFolderId) {
    openedItems.value = {}
  }
  Object.keys(openedItems.value)?.forEach((key) => {
    if (openedItems.value[key] === props.parentFolderId) {
      delete openedItems.value[key]
    }
  })
  openedItems.value[folder.uuid] = props.parentFolderId || true

  audioStore.selectedFolder = folder

  try {
    audioStore.currentPlaylist = await listFilesFromDirectory(folder.path)
  } catch (error) {
    console.error('m-tree/selectFolder error', error)
  }
}

</script>

<style lang="scss">
.status-indicator {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: $status-indicator-closed-color;
  margin-right: 1rem;

  &--open {
    background-color: $status-indicator-opened-color;
    transform: scale(1.2);
  }
}

.m-tree {
  color: $font-color-light;
  user-select: none;

  &__list {
    list-style: none;
    padding-inline-start: $playlists-default-margin;

    &-item {
      cursor: pointer;
      margin: 0.5rem 0;

      &text:hover {
        color: darken($font-color-light, 20%);
      }

      &--open {
        color: $playlists-color-selected;
      }
    }
  }
}
</style>