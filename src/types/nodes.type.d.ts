import { PROVIDERS } from 'app/src-electron/providers/providers.enum';

export type TreeItem = {
  uuid: string
  isPlaying?: boolean
  label: string
  isDir: boolean
  isSymLink?: boolean
  name:string
  path: string
  mime?: string
  children?: TreeItem[] | null
  provider?: PROVIDERS
};

export type Settings = {
  defaultPath:string
}

export type Library = {
  library:TreeItem[]
}

