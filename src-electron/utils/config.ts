import path from 'path'
import fse from 'fs-extra'
import { Settings as MSetttings } from '../../src/types/nodes.type'

const settingsPath = path.join(__dirname, '/settings.json')

export function initSettings() {
  try {
    fse.ensureFileSync(settingsPath)
  } catch (error) {
    console.error('initConfig/ensureFileSync error', error)
  }

  try {
    const data = fse.readJsonSync(settingsPath)
    return data
  } catch (warn) {
    console.warn('initConfig/readJsonSync warning', warn)
    fse.writeJsonSync(settingsPath, {
      defaultPath: 'H:\\MUSIQUE'
    })
  }
}

export async function getSettings(): Promise<MSetttings|undefined> {
  try {
    const data = await fse.readJson(settingsPath)
    return data as MSetttings
  } catch (error) {
    console.error('getSettings error', error)
  }
}

export async function setSettings(settings: MSetttings): Promise<boolean> {
  try {
    await fse.writeJson(settingsPath, settings)
    return true
  } catch (error) {
    return false
    console.error('setSettings error', error)
  }
}