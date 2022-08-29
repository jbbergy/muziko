import { defineStore } from 'pinia';
import { TreeItem } from 'src/types/nodes.type';
import { Ref, ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const selectedItem = ref<TreeItem>()
  const fileToPlay = ref<string>()

  return {
    selectedItem,
    fileToPlay
  }
});
