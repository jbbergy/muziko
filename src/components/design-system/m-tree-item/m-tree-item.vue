<template>
  <div :class="['m-tree-item', isSelected && 'm-tree-item--open']">
    <div class="status-indicator" @click="onSelectFolder(item)" />
    <div class="m-tree-item__label" @click="onSelectFolder(item)">
      {{ item.label }}
    </div>
    <div class="m-tree-item__controls">
      <button-play-small-svg @click="onSelectFolder(item, true)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emit } from "process";
import { ref } from "vue";
import ButtonPlaySmallSvg from "../../../assets/svg/icons/play-small.svg";

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
      display: block !important;
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
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.25rem;
    border-radius: 999px;
    background-color: $playlists-bg-color-play;
    display: none;

    svg {
      height: 100%;
      fill: $playlists-button-color-play;
    }

    &:hover {
      svg {
        height: 100%;
        fill: $playlists-button-color-playing;
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
