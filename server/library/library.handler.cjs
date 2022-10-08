const { ipcMain } = require('electron')
const { fetchAll, create, update, remove } = require('./library.controller.cjs')

const fetchAllHandler = () => {
  ipcMain.handle('libraryApi:fetchAll', async () => {
    return await fetchAll()
  })
}

const createHandler = () => {
  ipcMain.handle('libraryApi:create', async (event, payload) => {
    return await create(payload)
  })
}

const updateHandler = () => {
  ipcMain.handle('libraryApi:update', async (event, payload) => {
    return await update(payload)
  })
}

const removeHandler = () => {
  ipcMain.handle('libraryApi:remove', async (event, payload) => {
    return await remove(payload)
  })
}

module.exports = {
  initLibraryIPCHandlers: () => {
    createHandler()
    fetchAllHandler()
    removeHandler()
    updateHandler()
  }
}