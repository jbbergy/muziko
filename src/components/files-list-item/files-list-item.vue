<template>
  <div :class="[
      'files-list-item',
      props.isPlaying && 'files-list-item--is-playing'
    ]"
    @dblclick="onDblclick"
  >
    <span class="files-list-item__icon">
      <button-play-small-svg @click="onClick" />
    </span>
    <span>{{ tagArtist }}</span>
    <span>{{ tagTrackname }}</span>
  </div>
</template>

<script lang="ts" setup>
import ButtonPlaySmallSvg from "../../assets/svg/icons/play-small.svg";
import { computed } from "vue";

const tagTrackname = computed(() => {
  return props.item.metadata?.title || props.item.label;
});

const tagArtist = computed(() => {
  const artist = props.item.metadata?.artist || null;
  return artist ? `${artist}\xa0-\xa0` : "";
});

const emits = defineEmits(['dblclick', 'click'])

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
});

function onDblclick() {
  emits('dblclick')
}

function onClick() {
  emits('click')
}

</script>

<style lang="scss">
.files-list-item {
  $self: &;
  cursor: pointer;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  user-select: none;

  &--is-playing {
    color: $files-list-item-playing-color;

    #{$self}__icon {

      svg {
        display: inline-block;
        fill: $files-list-item-playing-color;
      }
    }
  }

  &__icon {
    width: 2rem;
    height: 1rem;
    position:relative;

    svg {
      position:absolute;
      height: 100%;
      display: none;
      fill: $files-list-item-play-button-bg;
    }
  }

  &:hover {
    background-color: $files-list-item-hover-bg-color;

    #{$self}__icon {

      svg {
        display: inline-block;
      }
    }
  }
}
</style>
