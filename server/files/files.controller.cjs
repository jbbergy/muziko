const { v4 } = require('uuid')
const path = require('path')
const fse = require('fs-extra')
const jsmediatags = require("jsmediatags");
const mime = require('mime-types')
const { app, dialog, BrowserWindow } = require('electron')

/*
* Open a dialog window to select a directory
* @return {string} filePaths - The path of the selected directory
*/
const selectDirectory = async () => {
  const options = {
    properties: ['openDirectory']
  }

  if (!app.isReady) return

  const dialogWindow = new BrowserWindow({ width: 800, height: 600 })

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
const readDirectory = async (directory) => {
  const directoryTree = []
  try {
    const files = await fse.readdir(directory)
    for (const file of files) {

      const pathToFile = path.join(directory, file)
      const stat = await fse.stat(pathToFile)

      const isDirectory = stat.isDirectory()
      const isSymbolicLink = stat.isSymbolicLink()

      const retVal = {
        uuid: v4(),
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
    console.error('File readDirectory error', error)
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
const listFilesFromDirectory = async (directory) => {
  const filesList = []
  try {
    const files = await fse.readdir(directory)
    for (const file of files) {

      const pathToFile = path.join(directory, file)
      const stat = await fse.stat(pathToFile)

      const isDirectory = stat.isDirectory()

      const mimeType = mime.lookup(pathToFile)

      let fileData = null
      if (!isDirectory) {
        try {
          const readTags = new Promise((resolve, reject) => {
            jsmediatags.read(pathToFile, {
              onSuccess: function (tags) {
                resolve(tags)
              },
              onError: function (error) {
                reject(error)
              }
            });
          })
          fileData = await readTags
        } catch (error) {
          console.error('listFilesFromDirectory/metadata error', error)
        }
      }

      if (!isDirectory && mimeType.toString().includes('audio')) {
        const retVal = {
          uuid: v4(),
          path: pathToFile,
          label: file.replace(/\.[^/.]+$/, ""),
          name: file,
          isDir: isDirectory,
          isSymLink: false,
          mime: mimeType,
          metadata: fileData.tags
        }
        filesList?.push(retVal)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return filesList
}


module.exports = {
  selectDirectory,
  readDirectory,
  listFilesFromDirectory
}