<template>
  <Story title="MTreeStory">
    <m-tree :library="state.lib" />
  </Story>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import MTree from './m-tree.vue'
import MtreeMock from './m-tree.mock.json'

const state = reactive({
  lib: MtreeMock.library
})

</script>