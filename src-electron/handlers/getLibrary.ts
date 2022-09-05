import { ipcMain } from 'electron'
import { getLibrary } from '../utils/library'

export function getLibraryHandler () {
  ipcMain.handle('myApi:getLibrary', async () => {
    return getLibrary()
  })
}
