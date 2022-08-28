<template>
  <q-layout view="lHh lpR lFf">

    <q-header reveal class="m-background-headline m-text-color-1">
      <q-toolbar>

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          Muziko
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="m-drawer-bg"
    >
      selected: {{ selected }}
      <q-tree
        v-if="nodes"
        ref="tree"
        :nodes="nodes"
        node-key="uuid"
        no-connectors
        v-model:selected="selected"
      @update:selected="onSelect"
      />
    </q-drawer>

    <q-page-container class="m-background">
      <router-view />
    </q-page-container>

    <q-footer class="m-background-headline m-text-color-1">
      <m-player />
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { readDirectory } from '../api/api';
import { Node } from '../types/nodes.type';
import MPlayer from 'src/components/m-player/m-player.vue';
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const leftDrawerOpen = ref(true);

let selected = ref<Node>();

let tree = ref();
let nodes = ref<Node[]>();

function onSelect(evt: string) {
  console.log('onSelect', evt);
  if (!nodes.value) return;
  selected.value = nodes.value.find((n) => n.uuid == evt);
}

onMounted(async () => {
  const result = await readDirectory('H:/MUSIQUE');
  nodes.value = result
    ?.filter((currNode) => currNode.isDir)
    .map((currNode) => {
      return {
        uuid: uuidv4(),
        label: `/${currNode.name}`,
        isDir: currNode.isDir,
        isSymLink: currNode.isSymLink,
        path: currNode.path,
        children: [
          {
            uuid: uuidv4(),
            label: 'test',
            isDir: currNode.isDir,
            isSymLink: currNode.isSymLink,
            path: currNode.path,
          },
        ],
      };
    });
  selected.value = nodes.value[0];
});
</script>