const path = require('path')
const { app, BrowserWindow } = require('electron')
const { initDbLibrary } = require('./library/library.controller.cjs')
const { initLibraryIPCHandlers } = require('./library/library.handler.cjs')
const { initFilesIPCHandlers } = require('./files/files.handler.cjs')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.removeMenu()
  if (process.env.NODE_ENV === 'dev') {
    win.maximize()
    win.webContents.openDevTools();
  }
  win.loadFile('dist/index.html')
}

app.whenReady().then(async () => {

  // init IPC handlers
  initLibraryIPCHandlers()
  initFilesIPCHandlers()

  await initDbLibrary()

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
