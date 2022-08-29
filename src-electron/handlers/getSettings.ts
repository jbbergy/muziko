import { ipcMain } from 'electron'
import { getSettings } from '../utils/config'

export function getSettingsHandler () {
  ipcMain.handle('myApi:getSettings', async () => {
    return getSettings()
  })
}
