<template>
  <div class="m-player">
    <button @click="stop">stop</button>
    <button @click="pause">pause</button>
    <button @click="play">play</button>
    <audio id="audioPlayer" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGlobalStore } from 'src/stores/global';

const audioPlayer = ref();
const store = useGlobalStore();

const fileToPlay = computed(() => store.fileToPlay);

watch(fileToPlay, (value) => {
  console.log('watch fileToPlay', value);
  audioPlayer.value = document.querySelector('#audioPlayer');
  console.log('audioPlayer', audioPlayer.value);
  if (!audioPlayer.value) return;

  audioPlayer.value.pause();
  audioPlayer.value.src = value;
  audioPlayer.value.volume = 0.3;
  audioPlayer.value.currentTime = 0;
  audioPlayer.value.play();
});

function stop() {
  console.log('stop');
  if (!audioPlayer.value) return;
  audioPlayer.value.pause();
  audioPlayer.value.src = null;
}

function pause() {
  console.log('pause');
  if (!audioPlayer.value) return;
  audioPlayer.value.pause();
}

function play() {
  console.log('play');
  if (!audioPlayer.value) return;
  if (audioPlayer.value.paused) {
    audioPlayer.value.play();
  }
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