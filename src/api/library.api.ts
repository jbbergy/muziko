
import { TreeItem, Library } from '../types/nodes.type'

export async function getLibrary ():Promise<TreeItem[]> {
  return await myApi.getLibrary()
}

export async function setLibrary (Library: TreeItem[]):Promise<boolean> {
  return await myApi.setLibrary(Library)
}

export async function addDirectory (directory: string):Promise<Library> {
  return await myApi.addDirectory(directory)
}
