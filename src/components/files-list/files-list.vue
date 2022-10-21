<template>
  <div class="files-list">
    <ul>
      <li
        class="files-list__item"
        v-for="audioItem in audioStore.currentPlaylist"
        :key="audioItem.uuid"
        @dblclick="onSelectFile(audioItem)"
      >
        <span class="files-list__itemtext">{{ audioItem.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();

function onSelectFile(file) {
  audioStore.currentFile = file
}

</script>

<style lang="scss">
.files-list {

  &__item {
      cursor: pointer;
    
      &text:hover {
        color: darken($font-color-light, 20%);
      }
  }
}
</style>