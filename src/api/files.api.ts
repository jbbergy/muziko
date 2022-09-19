
import { TreeItem } from '../types/nodes.type'

export async function listFilesFromDirectory (path: string):Promise<TreeItem[]> {
  const result = await myApi.listFilesFromDirectory(path)
  return result
}
