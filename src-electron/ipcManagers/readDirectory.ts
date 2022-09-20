import { ipcMain } from 'electron'
import { readDirectory } from '../managers/files'

export function readDirectoryHandler () {
  ipcMain.handle('myApi:readDirectory', async (event, path) => {
    return readDirectory(path)
  })
}
