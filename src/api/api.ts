import  { SysNode } from '../types/nodes.type'
export async function readDirectory (path: string):Promise<SysNode[]> {
  const result = await myApi.readDirectory(path)
  return result
}
