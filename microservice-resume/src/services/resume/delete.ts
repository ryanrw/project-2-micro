import { database } from "@utils/db"
import { CustomError } from "@utils/error"

export async function deleteResume() {
  const query = `DELETE FROM resume`

  try {
    await database.query(query)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
