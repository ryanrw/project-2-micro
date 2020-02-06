export type ErrorCode =
  | `AuthenticationError`
  | `DatabaseError`
  | `BcryptError`
  | `JWTError`
  | `RuntimeError`

export interface ErrorOption {
  message: string
  code: ErrorCode
}
