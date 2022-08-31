<template>
  <div class="m-player">
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      :value="currentVolume"
      @input="setVolume"
    >
    <button @click="stop">stop</button>
    <button @click="pause">pause</button>
    <button @click="play">play</button>
    <input
      type="range"
      min="0"
      max="100"
      :value="progressBarValue"
    >
    <audio id="audioPlayer" />
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
      src: [fileToPlay.value],
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
    }, 500);
  }
  howlerObj.value.play();
  isPaused.value = false;
}
</script>

<style lang="scss">
.m-player {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>