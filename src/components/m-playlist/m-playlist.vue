<template>
  <ul>
    <li v-for="(file, idx) in files" :key="idx">
      <audio :src="`file://H:/MUSIQUE/${file}`" controls />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { readDirectory } from '../../api/api';

const files = ref();

onMounted(async () => {
  files.value = await readDirectory('H:/MUSIQUE');
  files.value = files.value.filter((e: string) => e.includes('.mp3'));
});
</script>