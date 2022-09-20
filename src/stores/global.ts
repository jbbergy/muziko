import { defineStore } from 'pinia';
import { Settings, TreeItem } from 'src/types/nodes.type';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';

export const useGlobalStore = defineStore('global', () => {
  const selectedItem = ref<TreeItem | null>()
  const fileToPlay = ref<TreeItem | null>()
  const settings = ref<Settings | null>()
  const library = ref<TreeItem[] | null>()
  const filesList = ref<TreeItem[] | null>()
  const queue = ref<TreeItem[] | null>()

  const router = useRouter();

  watch(selectedItem, () => {
    if (router.currentRoute.value.name !== 'Home') {
      router.push({ name: 'Home' });
    }
  })

  return {
    selectedItem,
    fileToPlay,
    settings,
    library,
    filesList,
    queue
  }
});
