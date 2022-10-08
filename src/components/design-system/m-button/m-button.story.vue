<template>
  <Story title="Button">
    <Variant title="primary">
      <m-button-primary>Ajouter</m-button-primary>
    </Variant>
    <Variant title="secondary">
      <m-button-secondary>Ajouter un dossier</m-button-secondary>
    </Variant>
    <Variant title="control primary">
      <m-button-control-primary>
        <button-play-svg />
      </m-button-control-primary>
    </Variant>
    <Variant title="control secondary">
      <m-button-control-secondary>
        <button-shuffle-svg />
      </m-button-control-secondary>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import ButtonPlaySvg from '../../../assets/svg/icons/play.svg'
import ButtonShuffleSvg from '../../../assets/svg/icons/shuffle.svg'
import MButtonPrimary from './m-button.primary.vue'
import MButtonSecondary from './m-button.secondary.vue'
import MButtonControlPrimary from './m-button.control.primary.vue'
import MButtonControlSecondary from './m-button.control.secondary.vue'
</script>

<style lang="scss">

</style>