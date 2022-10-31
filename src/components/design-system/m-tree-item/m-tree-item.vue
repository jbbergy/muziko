<template>
  <div :class="['m-tree-item', isSelected && 'm-tree-item--open']">
    <div class="status-indicator" @click="onSelectFolder(item)" />
    <div class="m-tree-item__label" @click="onSelectFolder(item)">
      {{ item.label }}
    </div>
    <div class="m-tree-item__controls">
      <m-button-control-secondary @click="onSelectFolder(item, true)">
        <button-play-small-svg />
      </m-button-control-secondary>
      <m-button-control-secondary @click="onDelete(item)">
        <button-delete-svg />
      </m-button-control-secondary>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { remove } from "../../../api/library";
import MButtonControlSecondary from "../m-button/m-button.control.secondary.vue";
import ButtonPlaySmallSvg from "../../../assets/svg/icons/play-small.svg";
import ButtonDeleteSvg from "../../../assets/svg/icons/delete.svg";
import { useLibraryStore } from "../../../stores/library/library";

const libraryStore = useLibraryStore();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

function onSelectFolder(item, autoPlay = false) {
  emits("click", {
    folder: item,
    autoPlay,
  });
}

async function onDelete(folder) {
  if (confirm(`Supprimer la playlist ${folder.label} ?`)) {
    await remove(folder.uuid);
    await libraryStore.refreshLibrary();
  }
}
</script>

<style lang="scss">
.m-tree-item {
  $self: &;
  cursor: pointer;
  margin: 1rem 0;
  position: relative;
  display: grid;
  grid-template-columns: 1.5rem auto;
  align-items: center;

  &:hover {
    color: darken($font-color-light, 20%);

    #{$self}__controls {
      display: flex !important;
      flex-direction: row;
      align-items: center;
      column-gap: 0.5rem;
    }

    .status-indicator {
      opacity: 1 !important;
    }
  }

  &--open {
    color: $playlists-color-selected;

    .status-indicator {
      opacity: 1 !important;
      background-color: $status-indicator-opened-color !important;
      transform: scale(1.2) !important;
    }
  }

  &__controls {
    position: absolute;
    right: 1rem;
    top: 0;
    height: 1.6rem;
    display: none;

    svg {
      height: 100%;
      fill: $playlists-button-color-play;
    }

    .m-button-control {
      background-color: $playlists-bg-color-play;
      padding: 0.25rem;
      height: 100%;
      width: auto;

      &:hover {
        svg {
          height: 100%;
          fill: $playlists-button-color-playing;
        }
      }
    }
  }

  .status-indicator {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background-color: $status-indicator-closed-color;
    margin-right: 1rem;
    transition: opacity 0.2s ease;
    opacity: 0;

    &--open {
      background-color: $status-indicator-opened-color;
      transform: scale(1.2);
    }
  }
}
</style>
