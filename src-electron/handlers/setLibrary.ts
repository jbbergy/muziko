import { ipcMain } from 'electron'
import { setLibrary } from '../utils/library'
import { TreeItem } from '../../src/types/nodes.type'

export function setLibraryHandler () {
  ipcMain.handle('myApi:setLibrary', async (event, items: TreeItem[]) => {
    return setLibrary(items)
  })
}
