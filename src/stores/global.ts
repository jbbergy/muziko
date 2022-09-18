import { defineStore } from 'pinia';
import { Settings, TreeItem } from 'src/types/nodes.type';
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const selectedItem = ref<TreeItem | null>()
  const fileToPlay = ref<string | null>()
  const settings = ref<Settings | null>()
  const library = ref<TreeItem[] | null>()

  return {
    selectedItem,
    fileToPlay,
    settings,
    library
  }
});
