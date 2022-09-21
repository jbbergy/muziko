import { app, BrowserWindow, components, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';

import { initSettings } from './managers/config';
import { initLibrary } from './managers/library';

import { getSettingsHandler } from './ipcManagers/getSettings'
import { setSettingsHandler } from './ipcManagers/setSettings'
import { getLibraryHandler } from './ipcManagers/getLibrary'
import { setLibraryHandler } from './ipcManagers/setLibrary'
import { readDirectoryHandler } from './ipcManagers/readDirectory'
import { listFilesFromDirectoryHandler } from './ipcManagers/listFilesFromDirectory'
import { selectDirectoryHandler } from './ipcManagers/selectDirectory';
import { addDirectoryHandler } from './ipcManagers/addDirectory';
import { spotifyProviderInitHandler } from './ipcManagers/providers/spotify/init.spotify';
import { getTokensHandler } from './ipcManagers/getTokens';

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
getTokensHandler()

// Spotify provider
spotifyProviderInitHandler()

let mainWindow: BrowserWindow | undefined;

app.commandLine.appendSwitch('widevine-cdm-path', '../widevinecdm.dll')
// The version of plugin can be got from `chrome://components` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2449.0')

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

app.whenReady().then(async () => {
  await components.whenReady();
  console.log('components ready:', components.status());
  createWindow();
});

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
