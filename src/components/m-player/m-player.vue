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
import { Howl, Howler } from 'howler';
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from 'src/stores/global';

const howlerObj = ref();
let isPaused = ref(false);
let seek = ref(0);
let duration = ref(0);
let currentVolume = ref(0.3);
let intervalId: NodeJS.Timeout | null = null;

const store = useGlobalStore();
const progressBarValue = computed(() => {
  let result = 0;
  if (duration.value > 0) {
    result = (seek.value / duration.value) * 100;
    console.log('result', result);
  }
  return result;
});
const fileToPlay = computed(() => store.fileToPlay);

watch(fileToPlay, () => {
  stop();
  play();
});
watch(currentVolume, (value) => {
  Howler.volume(value);
});

function setVolume(event) {
  currentVolume.value = event.target.value;
}
function stop() {
  if (howlerObj.value?.playing() || isPaused.value === true) {
    howlerObj.value.stop();
    isPaused.value = false;
  }
}
function pause() {
  howlerObj.value.pause();
  isPaused.value = true;
}
function play() {
  if (isPaused.value === false) {
    if (!!intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    howlerObj.value = new Howl({
      src: [fileToPlay.value.path],
      html5: Howler.usingWebAudio,
    });
    howlerObj.value.on('load', function (e) {
      duration.value = howlerObj.value.duration();
    });
    howlerObj.value.on('end', function () {
      console.log('TODO: Load next file');
    });
    intervalId = setInterval(() => {
      seek.value = howlerObj.value?.seek();
      console.log('seek', seek.value);
    }, 100);
  }
  Howler.volume(currentVolume.value);
  howlerObj.value.play();
  isPaused.value = false;
}
</script>