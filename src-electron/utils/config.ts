import path from 'path'
import fse from 'fs-extra'

const settingsPath = path.join(__dirname, '/settings.json')

export function initSettings() {
  try {
    fse.ensureFileSync(settingsPath)
  } catch (error) {
    console.error('initConfig/ensureFileSync error', error)
  }

  try {
    const data = fse.readJsonSync(settingsPath)
  } catch (warn) {
    console.warn('initConfig/readJsonSync warning', warn)
    fse.outputJsonSync(settingsPath, {
      defaultPath: 'H:/MUSIQUE'
    })
  }
}

export function getSettings() {
  try {
    const data = fse.readJsonSync(settingsPath)
    return data
  } catch (error) {
    console.error('initConfig/getSettings error', error)
  }
}