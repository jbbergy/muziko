import { PROVIDERS } from 'app/src-electron/providers/providers.enum'
import { api } from 'app/src/boot/axios'
import { useGlobalStore } from 'app/src/stores/global'
import { TreeItem } from 'src/types/nodes.type'
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.spotify.com/v1'

export async function spotifyProviderInit() {
  await myApi.spotifyProviderInit()
}

export async function getSpotifyUser() {
  const store = useGlobalStore()
  const url = `${BASE_URL}/me`
  const accessToken = store.tokens?.find((t) => t.provider === PROVIDERS.SPOTIFY)?.accessToken
  try {
    const user = await api.get(url, {
      headers: {
        accept: 'Accept: application/json',
        contentType: 'application/json',
        authorization: `Bearer ${accessToken}`
      }
    })
    return user?.data
  } catch (error) {
    console.error('api/getUser error', error)
  }
}

export async function getSpotifyUserPlaylists():Promise<TreeItem[]> {
  const store = useGlobalStore()
  const accessToken = store.tokens?.find((t) => t.provider === PROVIDERS.SPOTIFY)?.accessToken
  const currentUser = store.user
  const url = `${BASE_URL}/users/${currentUser.id}/playlists`
  let allPlaylists = []
  let nbPlaylists = 0
  do {
    try {
        const playlists = await api.get(url, {
          params: {
            limit: 50,
            offset: allPlaylists.length
          },
          headers: {
            accept: 'Accept: application/json',
            contentType: 'application/json',
            authorization: `Bearer ${accessToken}`
          }
        })
      
      nbPlaylists = playlists.data?.items?.length

      if (playlists.data?.items?.length > 0) {
        allPlaylists = [...allPlaylists, ...playlists.data.items]
      }
    } catch (error) {
      console.error('api/getUser error', error)
    }
  } while (nbPlaylists === 50)
  
  return allPlaylists.map((p) => {
    const playlist: TreeItem = {
      uuid: p.id,
      provider: PROVIDERS.SPOTIFY,
      name: p.name,
      label: p.name,
      path: p.tracks.href,
      isDir: false,
      isSymLink: false
    }
    return playlist
  })
}

