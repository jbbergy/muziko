export type TreeItem = {
  uuid: string
  isPlaying?: boolean
  label: string
  isDir: boolean
  isSymLink?: boolean
  name:string
  path: string
  mime?: string
  children?: TreeItem[]|null
};

export type Settings = {
  defaultPath:string
}

export type Library = {
  library:TreeItem[]
}

