import { Token } from 'app/src-electron/utils/tokens-manager';
import { defineStore } from 'pinia';
import { getLibrary, setLibrary } from 'src/api/library.api';
import { getSpotifyDevices, getSpotifyUser, getSpotifyUserPlaylists } from 'src/api/providers/spotify.api';
import { Settings, TreeItem } from 'src/types/nodes.type';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { PROVIDERS } from 'app/src-electron/providers/providers.enum';
import SpotifyPlayer from 'spotify-web-playback';

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

    const playlists = await getSpotifyUserPlaylists()
    const currentLibrary = await getLibrary()

    const rootNode:TreeItem = {
      uuid: uuidv4(),
      path: '',
      label: PROVIDERS.SPOTIFY,
      name: PROVIDERS.SPOTIFY,
      isDir: false,
      isSymLink: false,
      children: playlists
    }
    currentLibrary.push(rootNode)
    library.value = currentLibrary
    await setLibrary(currentLibrary)

    const token = newToken.accessToken;
    console.log('token', token)

    const devices = await getSpotifyDevices()
    console.log('devices', devices)

    const uri = 'spotify:track:1KabKBb6Zgzv5dm1zq9YD8';
    console.log('uri', uri)
  
    const spotify = new SpotifyPlayer('Muziko player');
    console.log('spotify', spotify)
  
    const isConnected = await spotify.connect(token);
    console.log('connect', isConnected)
  
    spotify.play(uri);
    console.log('play')

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
