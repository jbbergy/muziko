<template>
  <div class="volume-control">
    <m-button-ctrl-secondary @click="onMute">
      <svg-sound-off v-if="isMuted" class="volume-control__icon" />
      <svg-sound-on v-else class="volume-control__icon" />
    </m-button-ctrl-secondary>
    <m-range :value="audioStore.currentVolume" @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import MButtonCtrlSecondary from "../design-system/m-button/m-button.control.secondary.vue";
import SvgSoundOn from '../../assets/svg/icons/sound-on.svg';
import SvgSoundOff from '../../assets/svg/icons/sound-off.svg';
import MRange from '../design-system/m-range/m-range.vue';
import { useAudioStore } from "../../stores/audio/audio";

const audioStore = useAudioStore();

const isMuted = ref(false)

onMounted(() => {
  document.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'm': 
        onMute()
        break;
    }
  })
})

function onMute() {
  isMuted.value = !isMuted.value
  if (isMuted.value) {
    audioStore.backupVolume = audioStore.currentVolume
  }
  onInput(isMuted.value ? 0 : audioStore.backupVolume)
}

function onInput(volume) {
  if (audioStore.currentInstance) {
    audioStore.currentVolume = volume
    audioStore.currentInstance.setVolume(audioStore.currentVolume);
  }
}

</script>

<style lang="scss">
  .volume-control {
    color: $font-color-light;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    .m-range {
      width: 10rem;
    }
  }
</style>