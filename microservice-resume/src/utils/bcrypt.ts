// Library
import bcrypt from "bcrypt"

// Local import
import { CustomError } from "./error"

const saltRound = 10

export async function encrypt(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(password, saltRound)

    return hash
  } catch (error) {
    throw new CustomError({ message: error.message, code: `BcryptError` })
  }
}

export async function compare(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const isPasswordMatch = await bcrypt.compare(password, hash)

    return isPasswordMatch
  } catch (error) {
    throw new CustomError({ message: error.message, code: `BcryptError` })
  }
}
