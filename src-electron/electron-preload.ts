import { contextBridge, ipcRenderer } from 'electron'
import { TreeItem } from '../../src/types/nodes.type'

contextBridge.exposeInMainWorld(
  'myApi',
  {
    getSettings: async () => await ipcRenderer.invoke('myApi:getSettings'),
    setSettings: async (settings: string) => await ipcRenderer.invoke('myApi:setSettings', settings),
    getLibrary: async () => await ipcRenderer.invoke('myApi:getLibrary'),
    setLibrary: async (items: TreeItem) => await ipcRenderer.invoke('myApi:setLibrary', items),
    readDirectory: (path: unknown) => ipcRenderer.invoke('myApi:readDirectory', path),
    listFilesFromDirectory: (path: unknown) => ipcRenderer.invoke('myApi:listFilesFromDirectory', path),
    selectDirectory: () => ipcRenderer.invoke('myApi:selectDirectory')
  }
)
