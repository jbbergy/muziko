import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fse from 'fs-extra'
import { TreeItem } from 'src/types/nodes.type';

export function readDirectory(directory: string) {
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

      if (!isDirectory) {
        const retVal:TreeItem = {
          uuid: uuidv4(),
          path: pathToFile,
          label: file,
          name: file,
          isDir: isDirectory,
          isSymLink: false,
        }
        filesList?.push(retVal)
      }
    }
  } catch (error) {
    console.error(error)
  }
  return filesList
}