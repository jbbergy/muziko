import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'myApi',
  {
    getSettings: () => ipcRenderer.invoke('myApi:getSettings'),
    readDirectory: (path: unknown) => ipcRenderer.invoke('myApi:readDirectory', path),
    listFilesFromDirectory: (path: unknown) => ipcRenderer.invoke('myApi:listFilesFromDirectory', path)
  }
)
