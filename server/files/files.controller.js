// TODO: manage audio files
// load directory and sub directories, load files from directory, read metadata

import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fse from 'fs-extra'
import mime from 'mime-types'
import { app, dialog, BrowserWindow } from 'electron'


/*
* Open a dialog window to select a directory
* @return {string} filePaths - The path of the selected directory
*/
export async function selectDirectory() {
  const options = {
    properties: ['openDirectory']
  }

  if (!app.isReady) return

  const dialogWindow = new BrowserWindow({width: 800, height: 600})
  
  const result = await dialog.showOpenDialog(dialogWindow, options)
  dialogWindow.close()

  return result?.filePaths
}

/*
* Read a specific directory and return all sub directories recurcively
* @param {string} directory - directory to scan
* @return [{
*   uuid: {string} - identifier,
*   path: {string} - full path to the directory,
*   label: {string} - display name of the directory,
*   name: {string} - name of the directory,
*   isDir: {boolean} - is a directory,
*   isSymLink: {boolean} - is a sym link,
* }]
*/
export async function readDirectory(directory) {
  const directoryTree = []
  try {
    const files = await fse.readdir(directory)
    for (const file of files) {
      
      const pathToFile = path.join(directory, file)
      const stat = await fse.stat(pathToFile)

      const isDirectory = stat.isDirectory()
      const isSymbolicLink = stat.isSymbolicLink()

      const retVal = {
        uuid: uuidv4(),
        path: pathToFile,
        label: file,
        name: file,
        isDir: isDirectory,
        isSymLink: isSymbolicLink,
      }

      if (retVal.isDir) {
        directoryTree?.push(retVal)
        retVal.children = await readDirectory(retVal.path)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return directoryTree
}

/*
* List all audio files from a specific directory
* @param {string} directory - directory to scan
* @return [{
*   uuid: {string} - identifier,
*   path: {string} - full path to the directory,
*   label: {string} - display name of the directory,
*   name: {string} - name of the directory,
*   isDir: {boolean} - is a directory,
*   isSymLink: {boolean} - is a sym link,
* }]
*/
export async function listFilesFromDirectory(directory) {
  const filesList = []
  try {
    const files = await fse.readdir(directory)
    for (const file of files) {
      
      const pathToFile = path.join(directory, file)
      const stat = await fse.stat(pathToFile)

      const isDirectory = stat.isDirectory()

      const mimeType = mime.lookup(pathToFile)

      if (!isDirectory && mimeType.toString().includes('audio')) {
        const retVal = {
          uuid: uuidv4(),
          path: pathToFile,
          label: file,
          name: file,
          isDir: isDirectory,
          isSymLink: false,
          mime: mimeType
        }
        filesList?.push(retVal)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return filesList
}