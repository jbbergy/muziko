<template>
  <div class="main-player">
    <div class="transport-controls">
      <m-button-ctrl-secondary :is-active="isShuffle" @click="onClickShuffle">
        <button-shuffle-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="isPrev" @click="onClickPrev">
        <button-prev-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-primary :is-active="isPlay">
        <button-pause-svg v-if="isPlaying" @click="pause" />
        <button-play-svg v-else @click="play" />
      </m-button-ctrl-primary>
      <m-button-ctrl-secondary :is-active="isNext" @click="onClickNext">
        <button-next-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="isRepeat" @click="onClickRepeat">
        <button-repeat-svg />
      </m-button-ctrl-secondary>
    </div>
    <m-progress-bar :value="progressBarValue" :currentTime="seek" :duration="duration" @onSeek="onSeek" />
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
const isShuffle = ref(false);
const isPrev = ref(false);
const isNext = ref(false);
const isPlay = ref(false);
const isRepeat = ref(false);
const seek = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
// let audioController: AudioController | null = null;
let intervalId: NodeJS.Timeout | null = null;

onMounted(() => {
  document.addEventListener('keyup', ({ key }) => {
    switch (key) {
      case 'MediaTrackNext': 
        onClickNext()
        break;
      case 'MediaTrackPrevious': 
        onClickPrev()
        break;
      case 'MediaPlayPause': 
        if (isPlaying) {
          pause()
        } else {
          play()
        }
        break;
    }
  })
})

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

watch(fileToPlay, () => {
  stop();
  play();
});

function onSeek(value) {
  audioStore.currentInstance?.seek(value);
  seek.value = value
}

function stop() {
  if (!audioStore.currentInstance) return;
  audioStore.currentInstance.stop();
}

function pause() {
  if (!audioStore.currentInstance) return;
  audioStore.currentInstance.pause();
}

function play() {
  if (!!intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (!audioStore.currentInstance?.getIsPaused()) {
    audioStore.currentInstance = new AudioController(fileToPlay.value?.path);
  }
  audioStore.currentInstance.getInstance().on("load", function () {
    if (!audioStore.currentInstance) return;
    duration.value = audioStore.currentInstance.getInstance().duration();
  });
  audioStore.currentInstance.getInstance().on("end", function () {
    onClickNext()
  });
  intervalId = setInterval(() => {
    if (!audioStore.currentInstance) return;
    isPlaying.value = audioStore.currentInstance.getIsPlaying()
    seek.value = audioStore.currentInstance.getInstance()?.seek() || 0;
  }, 100);
  audioStore.currentInstance.setVolume(audioStore.currentVolume);
  audioStore.currentInstance.play();
}

function onClickShuffle() {
  isShuffle.value = !isShuffle.value;
}

function onClickRepeat() {
  if (audioStore.currentInstance) {
    isRepeat.value = !isRepeat.value;
    audioStore.currentInstance.loop(isRepeat.value)
  }
}

function onClickPrev() {
  isPrev.value = true;
  const currentindex = audioStore.currentPlaylist.findIndex((item) => item.uuid === audioStore.currentFile.uuid)
  
  let newIndex = currentindex - 1

  if (isShuffle.value) {
    newIndex = Math.round(Math.random() * audioStore.currentPlaylist.length)
  }

  if (newIndex > -1) {
    audioStore.currentFile = audioStore.currentPlaylist[newIndex]
  }
  setTimeout(() => {
    isPrev.value = false;
  }, 500);
}

function onClickNext() {
  isNext.value = true;
  const currentindex = audioStore.currentPlaylist.findIndex((item) => item.uuid === audioStore.currentFile.uuid)
  
  let newIndex = currentindex + 1

  if (isShuffle.value) {
    newIndex = Math.round(Math.random() * audioStore.currentPlaylist.length)
  }

  if (newIndex >= audioStore.currentPlaylist.length) {
    newIndex = 0
  }

  if (newIndex < audioStore.currentPlaylist.length) {
    audioStore.currentFile = audioStore.currentPlaylist[newIndex]
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
