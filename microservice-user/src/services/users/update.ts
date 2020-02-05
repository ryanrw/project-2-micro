// Utility and Helper
import { CustomError } from "../../utils/error"
import createQuery, { database } from "../../utils/db"
import { encrypt } from "../../utils/bcrypt"

// Type and Interface
import { UpdateUserOption } from "users"

export async function updateUserInfo(
  updateUserid: string,
  option: UpdateUserOption
) {
  const optionWithEncryptPassword = await encryptTextPassword(option)

  const [_, data] = createQuery.objectToQuery(optionWithEncryptPassword)

  const useridParamNumber = `$${Object.keys(option).length + 1}`

  const updateQuery = createQuery.update({
    table: `users`,
    set: data,
    where: [`userid=${useridParamNumber}`],
  })

  const extractOption: string[] = Object.values(optionWithEncryptPassword)
  const value = [...extractOption, updateUserid]

  try {
    await database.query(updateQuery, value)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}

async function encryptTextPassword(option: UpdateUserOption) {
  if (!option.password) {
    return option
  }

  const copyOption = { ...option }

  copyOption.password = await encrypt(option.password)

  return copyOption
}
