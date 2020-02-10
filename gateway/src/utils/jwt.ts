// Library
import jwt from "jsonwebtoken"

// Configuration
import config from "../configs"

// Type and Interface
import { Payload } from "../types/jwt"

// Local import
import { CustomError } from "./error"

// will delete soon
export function generateJWT(payload: Payload) {
  const option: jwt.SignOptions = { expiresIn: "12 days" }
  const newJWT = jwt.sign(payload, config.secret, option)

  return newJWT
}

export function extractJWT(token: string): Payload {
  try {
    const payload = jwt.verify(token, config.secret)

    return payload as Payload
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `JWTError`,
    })
  }
}
