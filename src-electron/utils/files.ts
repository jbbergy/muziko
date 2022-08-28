import fs from 'fs'

export function readDirectory(dirPath:string): unknown {
  return fs.readdirSync(dirPath)
}
