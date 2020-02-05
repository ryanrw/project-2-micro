// Utility and Helper
import createQuery, { database } from "../../utils/db"
import { CustomError } from "../../utils/error"

export async function deleteUser(userid: string) {
  const deleteQuery = createQuery.delete({
    table: `users`,
    where: [`userid=$1`],
  })
  const value = [userid]

  try {
    await database.query(deleteQuery, value)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
