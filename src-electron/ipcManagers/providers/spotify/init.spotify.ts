import { ipcMain } from 'electron'
import { spotifyProviderInit } from 'app/src-electron/providers/spotify'

export function spotifyProviderInitHandler () {
  ipcMain.handle('myApi:spotifyProviderInit', async () => {
    await spotifyProviderInit()
  })
}
