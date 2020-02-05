export interface User {
  username: string
  email: string
  password: string
}

export interface ValidateUserOption {
  username: string
  password: string
}

export interface UserResultFromDatabase {
  userid: string
  username: string
  email: string
  password: string
}

export interface UpdateUserOption {
  username?: string
  email?: string
  password?: string
}

export interface UpdateUserResolver {
  userid: string
  option: UpdateUserOption
}

export interface UserInfo {
  userid?: string
  username?: string
}
