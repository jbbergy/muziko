
import { Settings } from '../types/nodes.type'

export async function getSettings ():Promise<Settings> {
  return await myApi.getSettings()
}
export async function setSettings (settings: string):Promise<boolean> {
  return await myApi.setSettings(settings)
}
