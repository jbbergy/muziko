const path = require('path')
const { app, BrowserWindow } = require('electron')
const { initDbLibrary } = require('./library/library.controller.cjs')
const { initLibraryIPCHandlers } = require('./library/library.handler.cjs')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.maximize()
  win.removeMenu()
  win.webContents.openDevTools();
  win.loadFile('dist/index.html')
}

app.whenReady().then(async () => {

  // init IPC handlers
  initLibraryIPCHandlers()

  await initDbLibrary()

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
