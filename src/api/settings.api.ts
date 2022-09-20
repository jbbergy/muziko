
import { Token } from 'app/src-electron/utils/tokens-manager'
import { Settings } from '../types/nodes.type'

export async function getSettings():Promise<Settings> {
  return await myApi.getSettings()
}

export async function setSettings(settings: string):Promise<boolean> {
  return await myApi.setSettings(settings)
}

export async function getTokens(provider:string):Promise<Token> {
  return await myApi.getTokens(provider)
}
