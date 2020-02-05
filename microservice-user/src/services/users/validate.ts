// Utility and Helper
import { CustomError } from "../../utils/error"
import { compare } from "../../utils/bcrypt"

// Type and Interface
import { ValidateUserOption } from "users"

// Local import
import { getUser } from "./get"

export async function validate(option: ValidateUserOption) {
  const data = await getUser({ username: option.username })

  const isPasswordCorrect = await compare(option.password, data.password)

  if (!isPasswordCorrect) {
    throw new CustomError({
      message: `Incorrected Password`,
      code: `AuthenticationError`,
    })
  }

  return data
}
