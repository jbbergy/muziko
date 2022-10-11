const { ipcMain } = require('electron')
const { 
  selectDirectory, 
  readDirectory, 
  listFilesFromDirectory
} = require('./files.controller.cjs')

const selectDirectoryHandler = () => {
  ipcMain.handle('filesApi:selectDirectory', async () => {
    return await selectDirectory()
  })
}

const readDirectoryHandler = () => {
  ipcMain.handle('filesApi:readDirectory', async (event, payload) => {
    return await readDirectory(payload)
  })
}

const listFilesFromDirectoryHandler = () => {
  ipcMain.handle('filesApi:listFilesFromDirectory', async (event, payload) => {
    return await listFilesFromDirectory(payload)
  })
}

module.exports = {
  initFilesIPCHandlers: () => {
    selectDirectoryHandler()
    readDirectoryHandler()
    listFilesFromDirectoryHandler()
  }
}