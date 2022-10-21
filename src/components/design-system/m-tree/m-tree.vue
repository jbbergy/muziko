<template>
  <div class="m-tree">
    <ul class="m-tree__list">
      <li class="m-tree__list-item"
        v-for="libraryItem in library"
        :key="libraryItem.uuid"
      >
        <span
          class="m-tree__list-itemtext"
          @click="selectFolder(libraryItem)"
        >
          {{ libraryItem.label }}
        </span>
        <template v-if="libraryItem.children.length > 0">
          <m-tree :library="libraryItem.children" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAudioStore } from "../../../stores/audio/audio";
import { listFilesFromDirectory } from "../../../api/files"

const audioStore = useAudioStore();

const tree = defineProps({
  library: {
    type: Array,
    default: [],
  },
});

async function selectFolder(folder) {
  audioStore.selectedFolder = folder

  try {
    audioStore.currentPlaylist = await listFilesFromDirectory(folder.path)
  } catch (error) {
    console.error('m-tree/selectFolder error', error)
  }
}

</script>

<style lang="scss">
.m-tree {

  &__list {

    &-item {
      cursor: pointer;

      &text:hover {
        color: darken($font-color-light, 20%);
      }
    }
  }
}
</style>
