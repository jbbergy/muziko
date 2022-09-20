import { ipcMain } from 'electron'
import { setSettings } from '../managers/config'

export function setSettingsHandler () {
  ipcMain.handle('myApi:setSettings', async (event, settings: string ) => {
    return await setSettings(JSON.parse(settings))
  })
}
