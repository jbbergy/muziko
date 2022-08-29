
import { TreeItem, Settings } from '../types/nodes.type'

export async function getSettings ():Promise<Settings> {
  return await myApi.getSettings()
}

export async function readDirectory (path: string):Promise<TreeItem[]> {
  const result = await myApi.readDirectory(path)
  return result
}

export async function listFilesFromDirectory (path: string):Promise<TreeItem[]> {
  const result = await myApi.listFilesFromDirectory(path)
  return result
}
