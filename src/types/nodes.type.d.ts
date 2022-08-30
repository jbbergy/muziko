export type TreeItem = {
  uuid: string
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

