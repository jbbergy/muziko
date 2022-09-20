import { Token } from 'app/src-electron/utils/tokens-manager';
import { defineStore } from 'pinia';
import { getSpotifyUser, getSpotifyUserPlaylists } from 'src/api/providers/spotify.api';
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
  const tokens = ref<Token[]>()
  const user = ref<any>()

  const router = useRouter();

  watch(selectedItem, () => {
    if (router.currentRoute.value.name !== 'Home') {
      router.push({ name: 'Home' });
    }
  })

  async function addToken(newToken: Token) {
    if (!newToken) return
    if (!tokens.value) tokens.value = [] as Token[]
    tokens.value.push(newToken)
    user.value = await getSpotifyUser()
    await getSpotifyUserPlaylists()
  }

  return {
    selectedItem,
    fileToPlay,
    settings,
    library,
    filesList,
    queue,
    tokens,
    addToken,
    user
  }
});
