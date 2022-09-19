import { ipcMain } from 'electron'
import { getLibrary } from '../managers/library'

export function getLibraryHandler () {
  ipcMain.handle('myApi:getLibrary', async () => {
    return getLibrary()
  })
}
