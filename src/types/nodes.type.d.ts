export type TreeItem = {
  uuid: string
  label: string
  isDir: boolean
  isSymLink?: boolean
  name:string
  path:string
  children?: TreeItem[]|null
};

