export async function selectDirectory():Promise<any> {
  try {
    const result = await window['filesApi']?.selectDirectory()
    return result
  } catch (error) {
    throw new Error(`api/selectDirectory error ${error}`);
  }
}

export async function readDirectory(payload:any):Promise<any> {
  try {
    const result = await window['filesApi']?.readDirectory(payload)
    return result
  } catch (error) {
    throw new Error(`api/readDirectory error ${error}`);
  }
}

export async function listFilesFromDirectory(payload:any):Promise<any> {
  try {
    const result = await window['filesApi']?.listFilesFromDirectory(payload)
    return result
  } catch (error) {
    throw new Error(`api/listFilesFromDirectory error ${error}`);
  }
}
