<template>
  <div class="ds-player">
    
    <div class="ds-player__progress-bar">
      <input
        no-radius
        type="range"
        min="0"
        max="100"
        step="0.1"
        :value="progressBarValue"
      >
    </div>
    <div class="ds-player__controls">
      <button
        class="ds-button ds-button--control"
        @click="stop"
      >
        <img src="../../assets/icons/btn-stop.svg" alt="stop button" />
      </button>
      <button
        class="ds-button ds-button--control"
        @click="pause"
      >
        <img src="../../assets/icons/btn-pause.svg" alt="pause button" />
      </button>
      <button
        class="ds-button ds-button--control"
        @click="play"
      >
        <img src="../../assets/icons/btn-play.svg" alt="play button" />
      </button>
      <div class="ds-player__controls-volume">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          :value="currentVolume"
          @input="setVolume"
        >
      </div>
      <div v-if="fileToPlay" class="ds-player__current-track">
        {{ fileToPlay.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { useGlobalStore } from 'src/stores/global';
import { AudioController } from 'src/controllers/audio.controller';

let audioController: AudioController | null = null;
let seek = ref(0);
let duration = ref(0);
let currentVolume = ref(0.3);
let intervalId: NodeJS.Timeout | null = null;

const store = useGlobalStore();
const progressBarValue = computed(() => {
  let result = 0;
  if (duration.value > 0) {
    result = (seek.value / duration.value) * 100;
  }
  return result;
});
const fileToPlay = computed(() => store.fileToPlay);

onBeforeUnmount(() => {
  if (audioController) audioController.destroy();
});

watch(fileToPlay, () => {
  stop();
  play();
});
watch(currentVolume, (value) => {
  audioController?.setVolume(value);
});

function setVolume(event) {
  currentVolume.value = event.target.value;
}

function stop() {
  if (!audioController) return;
  audioController.stop();
}

function pause() {
  if (!audioController) return;
  audioController.pause();
}

function play() {
  if (!!intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  if (!audioController?.getIsPaused()) {
    audioController = new AudioController(fileToPlay.value?.path);
  }

  audioController.getInstance().on('load', function () {
    if (!audioController) return;
    duration.value = audioController.getInstance().duration();
  });

  audioController.getInstance().on('end', function () {
    console.log('TODO: Load next file');
  });

  intervalId = setInterval(() => {
    if (!audioController) return;
    seek.value = audioController.getInstance()?.seek();
  }, 100);

  audioController.setVolume(currentVolume.value);
  audioController.play();
}
</script>