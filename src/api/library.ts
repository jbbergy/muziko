export async function getLibrary():Promise<any> {
  try {
    const result = await window['libraryApi']?.fetchAll()
    return result
  } catch (error) {
    throw new Error(`api/getLibrary error ${error}`);
  }
}

export async function create(payload:any):Promise<any> {
  try {
    const result = await window['libraryApi']?.create(payload)
    return result
  } catch (error) {
    throw new Error(`api/create error ${error}`);
  }
}

export async function update(payload:any):Promise<any> {
  try {
    const result = await window['libraryApi']?.update(payload)
    return result
  } catch (error) {
    throw new Error(`api/update error ${error}`);
  }
}

export async function remove(payload:any):Promise<any> {
  try {
    const result = await window['libraryApi']?.remove(payload)
    return result
  } catch (error) {
    throw new Error(`api/remove error ${error}`);
  }
}
