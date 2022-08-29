import { defineStore } from 'pinia';
import { Settings, TreeItem } from 'src/types/nodes.type';
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const selectedItem = ref<TreeItem>()
  const fileToPlay = ref<string>()
  const settings = ref<Settings>()

  return {
    selectedItem,
    fileToPlay,
    settings
  }
});
