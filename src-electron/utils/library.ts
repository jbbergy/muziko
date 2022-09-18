import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import fse from 'fs-extra'
import { Library, TreeItem } from '../../src/types/nodes.type'
import { readDirectory } from './files'
import { getSettings } from './config'

const libraryPath = path.join(__dirname, '/library.json')

export async function initLibrary() {
  try {
    fse.ensureFileSync(libraryPath)
  } catch (error) {
    console.error('initLibrary/ensureFileSync error', error)
  }

  try {
    const data = fse.readJsonSync(libraryPath)
    return data
  } catch (warn) {
    console.warn('initLibrary/readJsonSync warning', warn)
    let settings = null
    try {
      settings = await getSettings()
      if (!settings) throw Error('unable to getsettings')
    } catch (error) {
      console.error('initLibrary error', error)
    }
    if (!settings ) return
    let library = null
    try {

      library = {
        library: []
      }

      fse.writeJsonSync(libraryPath, library)
    } catch (error) {
      console.error('initLibrary error: unable to readDirectory', error)
    }

  }
}

export async function getLibrary() {
  try {
    const data = await fse.readJson(libraryPath)
    return data?.library
  } catch (error) {
    console.error('getSettings error', error)
  }
}

export async function setLibrary(items: TreeItem[]): Promise<boolean> {
  try {
    const library = {
      library: items
    }
    await fse.writeJson(libraryPath, library)
    return true
  } catch (error) {
    return false
    console.error('setLibrary error', error)
  }
}

export async function addDirectory(directory: string): Promise<TreeItem[]|null> {
  if (directory === '') return null

  const library: Library = {
    library: [] as TreeItem[]
  }
  try {
    library.library = await getLibrary()
  } catch (error) {
    console.error('addDirectory/getLibrary error', error)
  }

  if (!library.library) return null

  let newTree: TreeItem[]|null = null
  try {
    newTree = readDirectory(directory)
  } catch (error) {
    console.error('addDirectory/readDirectory error', error)
  }

  if (!newTree) return null
  const basename = path.basename(directory)
  const stat = fse.statSync(directory)

  const isDirectory = stat.isDirectory()
  const isSymbolicLink = stat.isSymbolicLink()

  const retVal:TreeItem = {
    uuid: uuidv4(),
    path: directory,
    label: basename,
    name: basename,
    isDir: isDirectory,
    isSymLink: isSymbolicLink,
    children: newTree
  }

  library.library.push(retVal)

  try {
    await setLibrary(library.library)
  } catch (error) {
    console.error('addDirectory/setLibrary error', error)
  }

  return library.library
}
