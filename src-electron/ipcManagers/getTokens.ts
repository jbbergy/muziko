import { ipcMain } from 'electron'
import { getTokens } from '../managers/config'

export function getTokensHandler () {
  ipcMain.handle('myApi:getTokens', async (event, provider) => {
    return await getTokens(provider)
  })
}
