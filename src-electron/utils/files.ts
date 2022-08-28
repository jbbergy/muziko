import path from 'path'
import fse from 'fs-extra'

export function readDirectory(folder: string) {
  const result:any[] = []
  try {
    const files = fse.readdirSync(folder)
    for (const file of files) {
      try {
        const pathToFile = path.join(folder, file)
        const stat = fse.statSync(pathToFile)

        const isDirectory = stat.isDirectory()
        const isSymbolicLink = stat.isSymbolicLink()

        const retVal = {
          path: pathToFile,
          name: file,
          isDir: isDirectory,
          isSymLink: isSymbolicLink,
          metadata: stat
        }
        result?.push(retVal)
      }
      catch (err) {
        const retVal = {
          path: path.join(folder, file),
          name: file,
          error: err
        }
        result?.push(retVal)
      }
    }
  }
  catch (err) {
    const retVal = {
      path: folder,
      error: err
    }
    result?.push(retVal)
  }
  return result
}