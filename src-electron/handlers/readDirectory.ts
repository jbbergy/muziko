import { ipcMain } from 'electron'
import { readDirectory } from '../utils/files'

export function readDirectoryHandler () {
  ipcMain.handle('myApi:readDirectory', async (event, path) => {
    return readDirectory(path)
  })
}
