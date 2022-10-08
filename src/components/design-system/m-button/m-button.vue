<template>
  <button
    class="m-button"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.m-button {
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>