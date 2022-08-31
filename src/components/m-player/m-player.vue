<template>
  <div class="m-player">
    <button @click="stop">stop</button>
    <button @click="pause">pause</button>
    <button @click="play">play</button>
    {{ progressBarValue }}%
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

const store = useGlobalStore();
let intervalId: NodeJS.Timeout | null = null;
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
    howlerObj.value.volume(0.3);
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