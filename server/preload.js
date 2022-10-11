const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'libraryApi',
  {
    fetchAll: async () => await ipcRenderer.invoke('libraryApi:fetchAll'),
    create: async (payload) => await ipcRenderer.invoke('libraryApi:create', payload),
    update: async (payload) => await ipcRenderer.invoke('libraryApi:update', payload),
    remove: async (payload) => await ipcRenderer.invoke('libraryApi:remove', payload),
  }
)

contextBridge.exposeInMainWorld(
  'filesApi',
  {
    selectDirectory: async () => await ipcRenderer.invoke('filesApi:selectDirectory'),
    readDirectory: async (payload) => await ipcRenderer.invoke('filesApi:readDirectory', payload),
    listFilesFromDirectory: async (payload) => await ipcRenderer.invoke('filesApi:listFilesFromDirectory', payload),
  }
)

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})