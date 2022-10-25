<template>
  <div class="main-container">
    <main-header></main-header>
    <sidebar></sidebar>
    <div :class="[
        'main-container__main-view',
        'custom-scrollbar',
        audioStore.isLoadingFiles && 'no-scroll',
      ]"
    >
      <div v-if="audioStore.isLoadingFiles" class="loader" >
        <img src="./assets/img/loader.gif" alt="Chargment des données" />
      </div>
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/sidebar/sidebar.vue'
import MainHeader from './components/main-header/main-header.vue'
import MainFooter from './components/main-footer/main-footer.vue'
import { useAudioStore } from "./stores/audio/audio";

const audioStore = useAudioStore();
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Helvetica Neue,helvetica,arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic;
  color: $font-color-light;
  width: 100vw;
  height: 100vh;
  background: $dark;
  overflow: hidden;

  .no-scroll {
    overflow: hidden !important;
  }

  .main-container {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header"
      "nav main-view"
      "player player";

    &__main-view {
      position: relative;
      $mainViewRef: &;
      grid-area: main-view;
      background: $background-base;
      border-radius: 0.5rem;
      overflow: auto;

      .loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(black, 0.25);
        backdrop-filter: blur(5px);
      }
    }
  }
}
</style>
