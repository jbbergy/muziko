import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'myApi',
  {
    getSettings: async () => await ipcRenderer.invoke('myApi:getSettings'),
    setSettings: async (settings: string) => await ipcRenderer.invoke('myApi:setSettings', settings),
    readDirectory: (path: unknown) => ipcRenderer.invoke('myApi:readDirectory', path),
    listFilesFromDirectory: (path: unknown) => ipcRenderer.invoke('myApi:listFilesFromDirectory', path),
    selectDirectory: () => ipcRenderer.invoke('myApi:selectDirectory')
  }
)
