<template>
  <div class="now-playing">
    <div class="now-playing__cover">
      <img src="../../assets/img/cover.jfif" alt="Cover" />
    </div>
    <div class="now-playing__title">
      <div class="now-playing__main-title">In Between</div>
      <div class="now-playing__subtitle">Enluv, Molly McPhaul</div>
    </div>
  </div>
</template>

<style lang="scss">
  .now-playing {
    display: flex;
    gap: 1rem;
    align-items: center;
    height: 100%;

    &__title {
      display: flex;
      gap: 0.25rem;
      flex-direction: column;
    }

    &__main-title {
      font-size: $now-playing-title;
      font-weight: 400;
    }

    &__subtitle {
      font-size: $now-playing-subtitle;
      color: $font-color-grey;
    }
  }
</style>