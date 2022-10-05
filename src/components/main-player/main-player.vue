<template>
  <div class="main-player">
    <m-button-ctrl-secondary>
      <button-prev-svg />
    </m-button-ctrl-secondary>
    <m-button-ctrl-primary>
      <button-play-svg />
   </m-button-ctrl-primary>
    <m-button-ctrl-secondary>
      <button-next-svg />
    </m-button-ctrl-secondary>
  </div>
</template>

<script lang="ts" setup>
import MButtonCtrlPrimary from '../design-system/m-button/m-button.control.primary.vue'
import MButtonCtrlSecondary from '../design-system/m-button/m-button.control.secondary.vue'
import ButtonPlaySvg from '../../assets/svg/icons/play.svg'
import ButtonPrevSvg from '../../assets/svg/icons/prev.svg'
import ButtonNextSvg from '../../assets/svg/icons/next.svg'
</script>

<style lang="scss" scoped>
  .main-player {
    grid-area: player;
    height: 4.5rem;
    background: $dark;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>