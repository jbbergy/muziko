const { v4 } = require('uuid')
const fse = require('fs-extra')
const path = require('path')
const { app } = require('electron')
const { readDirectory } = require('../files/files.controller.cjs')


const libraryPath = path.join(app.getPath('userData'), '/muziko.library.db.json')
var adapter = null
var db = null

/*
* specify if the database is initialized
* @return {boolean} - true if is initialized, false if not
*/
const isDbLibraryInitialized = () => {
  return (db?.data?.library !== null)
}

/*
* initialize the database by creating library.db.json file
* if not exist in user data directory
* @return {boolean} - true if is initialized, false if not
*/
const initDbLibrary = async () => {
  console.info('sync library to', libraryPath)
  const lowdb = await import('lowdb')
  adapter = new lowdb.JSONFile(libraryPath)
  db = new lowdb.Low(adapter)

  try {
    await db.read()
  } catch (error) {
    console.error('initDb read error', error)
    return false
  }

  if (!db.data?.library) {
    db.data ||= { library: [] }
  }

  try {
    await db.write()
    return true
  } catch (error) {
    console.error('initDb write error', error)
    return false
  }
}

/*
* get the complete library in JSON format
* @return { Array }
*/
const fetchAll = () => {
  if (!isDbLibraryInitialized()) return null
  return db.data.library
}

/*
* create a new entry in the library
* @return {boolean} - true if the entry is created, false if not 
* and null if database is not initialized
*/
const create = async (libraryItem) => {
  if (!isDbLibraryInitialized()) return null
  if (!libraryItem) return

  let newTree = null
  try {
    newTree = await readDirectory(libraryItem)
  } catch (error) {
    console.error('library create error', error)
  }

  const basename = path.basename(libraryItem)
  const stat = fse.statSync(libraryItem)

  const isDirectory = stat.isDirectory()
  const isSymbolicLink = stat.isSymbolicLink()

  const retVal = {
    uuid: v4(),
    path: libraryItem,
    label: basename,
    name: basename,
    isDir: isDirectory,
    isSymLink: isSymbolicLink,
    children: newTree
  }

  db.data.library.push(retVal)

  try {
    await db.write()
    return true
  } catch (error) {
    console.error('initDb create error', error)
    return false
  }
}

/*
* update a specific entry in the database
* @return {boolean} - true if the entry is updated, false if not 
* and null if database is not initialized
*/
const update = async (updatedItem) => {
  if (!isDbLibraryInitialized()) return null
  const itemToUpdateIndex = db.data.library.findIndex((currentItem) => currentItem.id === updatedItem.id)
  const itemToUpdate = db.data.library.find((currentItem) => currentItem.id === updatedItem.id)
  if (itemToUpdateIndex === -1) return null

  Object.keys(itemToUpdate).forEach((currentItem) => {
    if (itemToUpdate[currentItem] !== updatedItem[currentItem]) {
      itemToUpdate[currentItem] = updatedItem[currentItem]
    }
  })

  db.data.library[itemToUpdateIndex] = itemToUpdate

  try {
    await db.write()
    return true
  } catch (error) {
    console.error('initDb update error', error)
    return false
  }
}

/*
* remove a specific entry from the database
* @param {string} - uuid of the item to delete
* @return {boolean} - true if the entry is removed, false if not 
* and null if database is not initialized
*/
const remove = async (itemId) => {
  if (!isDbLibraryInitialized()) return null
  const itemToDeleteIdx = db.data.library.findIndex((currentItem) => currentItem.id === itemId)

  db.data.library.splice(itemToDeleteIdx, 1)

  try {
    await db.write()
    return true
  } catch (error) {
    console.error('initDb remove error', error)
    return false
  }
}

module.exports = {
  isDbLibraryInitialized,
  initDbLibrary,
  fetchAll,
  create,
  update,
  remove
}