import { ipcMain } from 'electron'
import { addDirectory } from '../utils/library'

export function addDirectoryHandler () {
  ipcMain.handle('myApi:addDirectory', async (event, directory: string ) => {
    return await addDirectory(directory)
  })
}
