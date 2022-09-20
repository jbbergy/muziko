import { ipcMain } from 'electron'
import { listFilesFromDirectory } from '../managers/files'

export function listFilesFromDirectoryHandler () {
  ipcMain.handle('myApi:listFilesFromDirectory', async (event, path) => {
    return listFilesFromDirectory(path)
  })
}
