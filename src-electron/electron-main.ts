import { app, BrowserWindow, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';

import { getSettingsHandler } from './handlers/getSettings'
import { setSettingsHandler } from './handlers/setSettings'
import { getLibraryHandler } from './handlers/getLibrary'
import { setLibraryHandler } from './handlers/setLibrary'
import { readDirectoryHandler } from './handlers/readDirectory'
import { listFilesFromDirectoryHandler } from './handlers/listFilesFromDirectory'
import { initSettings } from './managers/config';
import { selectDirectoryHandler } from './handlers/selectDirectory';
import { initLibrary } from './managers/library';
import { addDirectoryHandler } from './handlers/addDirectory';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) { }

initSettings()
initLibrary()
getSettingsHandler()
setSettingsHandler()
getLibraryHandler()
setLibraryHandler()
readDirectoryHandler()
listFilesFromDirectoryHandler()
selectDirectoryHandler()
addDirectoryHandler()

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    maximizable: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });
  mainWindow.setBackgroundColor('#271c19')
  mainWindow.maximize();
  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
