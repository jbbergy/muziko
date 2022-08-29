import { ipcMain } from 'electron'
import { listFilesFromDirectory } from '../utils/files'

export function listFilesFromDirectoryHandler () {
  ipcMain.handle('myApi:listFilesFromDirectory', async (event, path) => {
    return listFilesFromDirectory(path)
  })
}
