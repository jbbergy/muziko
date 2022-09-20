import { ipcMain } from 'electron'
import { selectDirectory } from '../managers/files'

export function selectDirectoryHandler () {
  ipcMain.handle('myApi:selectDirectory', async () => {
    return selectDirectory()
  })
}
