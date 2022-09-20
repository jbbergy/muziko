import { ipcMain } from 'electron'
import { getSettings } from '../managers/config'

export function getSettingsHandler () {
  ipcMain.handle('myApi:getSettings', async () => {
    return getSettings()
  })
}
