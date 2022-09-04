import { ipcMain } from 'electron'
import { selectDirectory } from '../utils/files'

export function selectDirectoryHandler () {
  ipcMain.handle('myApi:selectDirectory', async () => {
    return selectDirectory()
  })
}
