
import { TreeItem, Settings } from '../types/nodes.type'

export async function getSettings ():Promise<Settings> {
  return await myApi.getSettings()
}
export async function setSettings (settings: string):Promise<boolean> {
  return await myApi.setSettings(settings)
}

export async function getLibrary ():Promise<TreeItem[]> {
  return await myApi.getLibrary()
}
export async function setLibrary (Library: TreeItem[]):Promise<boolean> {
  return await myApi.setLibrary(Library)
}

export async function readDirectory (path: string):Promise<TreeItem[]> {
  const result = await myApi.readDirectory(path)
  return result
}

export async function listFilesFromDirectory (path: string):Promise<TreeItem[]> {
  const result = await myApi.listFilesFromDirectory(path)
  return result
}
