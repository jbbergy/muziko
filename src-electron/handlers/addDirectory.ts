import { ipcMain } from 'electron'
import { addDirectory } from '../managers/library'

export function addDirectoryHandler () {
  ipcMain.handle('myApi:addDirectory', async (event, directory: string ) => {
    return await addDirectory(directory)
  })
}
