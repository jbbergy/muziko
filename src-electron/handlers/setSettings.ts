import { ipcMain } from 'electron'
import { setSettings } from '../utils/config'
import { Settings as MSetttings } from '../../src/types/nodes.type'

export function setSettingsHandler () {
  ipcMain.handle('myApi:setSettings', async (event, settings: string ) => {
    return await setSettings(JSON.parse(settings))
  })
}
