export type SysNode = {
  isDir: boolean
  isSymLink: boolean
  metadata: {
    dev: number,
    mode: number,
    nlink: number,
    uid: number,
    gid: number
  }
  name:string
  path:string
};

export type Node = {
  uuid: string
  label: string
  isDir: boolean
  isSymLink: boolean
  name:string
  path:string
};

