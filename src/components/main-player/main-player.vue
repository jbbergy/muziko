<template>
  <div class="main-player">
    <div class="transport-controls">
      <m-button-ctrl-secondary :is-active="audioStore.isShuffle" @click="onClickShuffle">
        <button-shuffle-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="isPrev" @click="onClickPrev">
        <button-prev-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-primary :is-active="isPlay">
        <button-pause-svg v-if="isPlaying" @click="play" />
        <button-play-svg v-else @click="play" />
      </m-button-ctrl-primary>
      <m-button-ctrl-secondary :is-active="isNext" @click="onClickNext">
        <button-next-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="audioStore.isLoop" @click="onClickRepeat">
        <button-repeat-svg />
      </m-button-ctrl-secondary>
    </div>
    <m-progress-bar
      :value="progressBarValue"
      :currentTime="seek"
      :duration="duration"
      @onSeek="onSeek"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeUnmount, watch, onMounted } from "vue";
import MButtonCtrlPrimary from "../design-system/m-button/m-button.control.primary.vue";
import MButtonCtrlSecondary from "../design-system/m-button/m-button.control.secondary.vue";
import ButtonPlaySvg from "../../assets/svg/icons/play.svg";
import ButtonPauseSvg from "../../assets/svg/icons/pause.svg";
import ButtonPrevSvg from "../../assets/svg/icons/prev.svg";
import ButtonNextSvg from "../../assets/svg/icons/next.svg";
import ButtonShuffleSvg from "../../assets/svg/icons/shuffle.svg";
import ButtonRepeatSvg from "../../assets/svg/icons/repeat.svg";
import MProgressBar from "../design-system/m-progress-bar/m-progress-bar.vue";
import { AudioController } from "../../api/audio";
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();
const isPrev = ref(false);
const isNext = ref(false);
const isPlay = ref(false);
const seek = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
let intervalId: NodeJS.Timeout | null = null;

onMounted(() => {
  document.addEventListener("keyup", (event) => {
    if (!!event.ctrlKey) {
      switch (event.code) {
        case "KeyP":
          onClickPrev();
          break;
        case "KeyN":
          onClickNext();
          break;
        case "KeyPL":
          onClickRepeat();
          break;
        case "KeyS":
          onClickShuffle();
          break;
        case "Space":
          if (audioStore.currentInstance.getIsPaused()) {
            play();
          } else {
            pause();
          }
          break;
      }
    } else {
      switch (event.key) {
        case "MediaTrackNext":
          onClickNext();
          break;
        case "MediaTrackPrevious":
          onClickPrev();
          break;
      }
    }
  });
});

onBeforeUnmount(() => {
  if (audioStore.currentInstance) audioStore.currentInstance.destroy();
});

const progressBarValue = computed(() => {
  let result = 0;
  if (duration.value > 0) {
    result = (seek.value / duration.value) * 100;
  }
  return result;
});
const fileToPlay = computed(() => audioStore.currentFile);

watch(fileToPlay,() => {
  stop();
  play();
}, {
  deep: true
});

function onSeek(value) {
  audioStore.currentInstance?.seek(value);
  seek.value = value;
}

function stop() {
  if (!audioStore.currentInstance) return;
  audioStore.currentInstance.destroy();
  audioStore.currentInstance = null
}

function pause() {
  if (!audioStore.currentInstance) return;
  audioStore.currentInstance.pause();
  isPlaying.value = false
}

function play() {
  if (audioStore.currentInstance?.getIsPlaying()) {
    pause()
  } else if (audioStore.currentInstance) {
    audioStore.currentInstance.play();
    isPlaying.value = true
  } else {
    audioStore.currentInstance = new AudioController(fileToPlay.value?.path);
    audioStore.currentInstance.setVolume(audioStore.currentVolume)
    audioStore.currentInstance.play();
    audioStore.currentInstance.on('ended', () => {
      onClickNext()
    }) 
    isPlaying.value = true
  }
}

function onClickShuffle() {
  audioStore.isShuffle = !audioStore.isShuffle;
}

function onClickRepeat() {
  if (audioStore.currentInstance) {
    audioStore.isLoop = !audioStore.isLoop;
  }
}

function onClickPrev() {
  isPrev.value = true;
  const currentindex = audioStore.currentPlaylist.findIndex(
    (item) => item.uuid === audioStore.currentFile.uuid
  );

  let newIndex = currentindex - 1;

  if (audioStore.isShuffle) {
    newIndex = Math.round(Math.random() * audioStore.currentPlaylist.length);
  }

  if (newIndex > -1) {
    audioStore.currentFile = audioStore.currentPlaylist[newIndex];
  }
  setTimeout(() => {
    isPrev.value = false;
  }, 500);
}

function onClickNext() {
  console.log('onClickNext')
  isNext.value = true;
  const currentindex = audioStore.currentPlaylist.findIndex(
    (item: any) => item.uuid === audioStore.currentFile.uuid
  );

  let newIndex = currentindex + 1

  if ( audioStore.isLoop ){
    newIndex = currentindex
    audioStore.currentFile = null
  } else if (audioStore.isShuffle) {
    newIndex = Math.round(Math.random() * audioStore.currentPlaylist.length)
  }

  if (newIndex >= audioStore.currentPlaylist.length) {
    newIndex = 0;
  }

  if (newIndex < audioStore.currentPlaylist.length) {
    audioStore.currentFile = audioStore.currentPlaylist[newIndex];
  }
  setTimeout(() => {
    isNext.value = false;
  }, 300);
}
</script>

<style lang="scss" scoped>
.main-player {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .transport-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
}
</style>
