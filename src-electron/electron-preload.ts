import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'myApi',
  {
    readDirectory: (path: unknown) => ipcRenderer.invoke('myApi:readDirectory', path)
  }
)
