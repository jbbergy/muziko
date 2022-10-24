<template>
  <div class="files-list">
    <h1 class="files-list__title">
      {{ audioStore.selectedFolder.label }}
    </h1>
    <ul
      class="files-list__list"
    >
      <li
        class="files-list__list-item"
        v-for="audioItem in audioStore.currentPlaylist"
        :key="audioItem.uuid"
        :id="audioItem.uuid"
      >
        <files-list-item
          :item="audioItem"
          :is-playing="currentFileId === audioItem.uuid"
          @dblclick="onSelectFile(audioItem)"
          @click="onSelectFile(audioItem)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import FilesListItem from '../files-list-item/files-list-item.vue'
import { useAudioStore } from "../../stores/audio/audio"

const audioStore = useAudioStore();

const currentFileId = computed(() => {
  return audioStore?.currentFile?.uuid
})

watch(currentFileId, (value) => {
  const trackEl = document.getElementById(value)
  if (trackEl) {
    trackEl.scrollIntoView({
      behavior: 'smooth'
    })
  }
})

function onSelectFile(file) {
  audioStore.currentFile = file
}

</script>

<style lang="scss">
.files-list {

  &__title {
    text-transform: uppercase;
    margin-left: 1rem;
  }

  &__list {
    list-style: none;
    padding-inline-start: $playlists-default-margin;
    padding-inline-end: $playlists-default-margin;
  }
}
</style>