export interface SelectOption {
  data: string[]
  from: string[]
  where?: string[]
}

export interface UpdateOption {
  table: string
  set: string[]
  where: string[]
}

export type GenericObject = { [key: string]: any }

export interface DeleteOption {
  table: string
  where: string[]
}
