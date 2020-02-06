import { database } from "@utils/db"
import { CustomError } from "@utils/error"

export async function checkDataExist() {
  const query = `SELECT * FROM resume`

  try {
    const response = await database.query(query)

    const hasData = response.rowCount > 0

    if (hasData) {
      throw new CustomError({
        message: `Current Resumé exist. Can't create new one`,
        code: `DatabaseError`,
      })
    }
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
