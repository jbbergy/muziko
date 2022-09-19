import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fse from 'fs-extra'
import mime from 'mime-types'
import { TreeItem } from 'src/types/nodes.type';
import { app, dialog, OpenDialogOptions,BrowserWindow } from 'electron'

export async function selectDirectory() {
  const options:OpenDialogOptions = {
    properties: ['openDirectory']
  }
  if (!app.isReady) return
  const dialogWindow = new BrowserWindow({width: 800, height: 600})
  const result = await dialog.showOpenDialog(dialogWindow, options)
  dialogWindow.close()
  return result?.filePaths
}

export function readDirectory(directory: string):TreeItem[] {
  const directoryTree: TreeItem[] = [] as TreeItem[]
  try {
    const files = fse.readdirSync(directory)
    for (const file of files) {
      
      const pathToFile = path.join(directory, file)
      const stat = fse.statSync(pathToFile)

      const isDirectory = stat.isDirectory()
      const isSymbolicLink = stat.isSymbolicLink()

      const retVal:TreeItem = {
        uuid: uuidv4(),
        path: pathToFile,
        label: file,
        name: file,
        isDir: isDirectory,
        isSymLink: isSymbolicLink,
      }

      if (retVal.isDir) {
        directoryTree?.push(retVal)
        retVal.children = readDirectory(retVal.path)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return directoryTree
}

export function listFilesFromDirectory(directory: string) {
  const filesList: TreeItem[] = [] as TreeItem[]
  try {
    const files = fse.readdirSync(directory)
    for (const file of files) {
      
      const pathToFile = path.join(directory, file)
      const stat = fse.statSync(pathToFile)

      const isDirectory = stat.isDirectory()

      const mimeType = mime.lookup(pathToFile)

      if (!isDirectory && mimeType.toString().includes('audio')) {
        const retVal:TreeItem = {
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