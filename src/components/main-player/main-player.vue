<template>
  <div class="main-player">
    <div class="transport-controls">
      <m-button-ctrl-secondary :is-active="isShuffle" @click="onClickShuffle">
        <button-shuffle-svg/>
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="isPrev" @click="onClickPrev">
        <button-prev-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-primary :is-active="isPlay">
        <button-play-svg />
    </m-button-ctrl-primary>
      <m-button-ctrl-secondary :is-active="isNext" @click="onClickNext">
        <button-next-svg />
      </m-button-ctrl-secondary>
      <m-button-ctrl-secondary :is-active="isRepeat" @click="onClickRepeat">
        <button-repeat-svg />
      </m-button-ctrl-secondary>
    </div>
    <m-progress-bar />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MButtonCtrlPrimary from '../design-system/m-button/m-button.control.primary.vue'
import MButtonCtrlSecondary from '../design-system/m-button/m-button.control.secondary.vue'
import ButtonPlaySvg from '../../assets/svg/icons/play.svg'
import ButtonPrevSvg from '../../assets/svg/icons/prev.svg'
import ButtonNextSvg from '../../assets/svg/icons/next.svg'
import ButtonShuffleSvg from '../../assets/svg/icons/shuffle.svg'
import ButtonRepeatSvg from '../../assets/svg/icons/repeat.svg'
import MProgressBar from '../design-system/m-progress-bar/m-progress-bar.vue'

const isShuffle = ref(false)
const isPrev = ref(false)
const isNext = ref(false)
const isPlay = ref(false)
const isRepeat = ref(false)

function onClickShuffle() {
  isShuffle.value = !isShuffle.value
}

function onClickRepeat() {
  isRepeat.value = !isRepeat.value
}

function onClickPrev() {
  isPrev.value = true
  setTimeout(() => {
    isPrev.value = false
  }, 500);
}

function onClickNext() {
  isNext.value = true
  setTimeout(() => {
    isNext.value = false
  }, 500);
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