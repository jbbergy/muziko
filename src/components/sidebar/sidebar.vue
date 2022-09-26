<template>
  <nav class="sidebar">sidebar</nav>
</template>

<script lang="ts" setup>
const name = "Sidebar";
</script>


<style lang="scss" scoped>
.sidebar {
  grid-area: nav;
  width: 21rem;
  background: $background-base;
  border-radius: 0.5rem;
}
</style>