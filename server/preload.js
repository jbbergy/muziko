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

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})