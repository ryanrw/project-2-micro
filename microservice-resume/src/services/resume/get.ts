import { database } from "@utils/db"
import { CustomError } from "@utils/error"
import { ResumeResult } from "resume"

export async function getResume() {
  const query = `SELECT metadata FROM resume`

  try {
    const response = await database.query<ResumeResult>(query)

    const hasData = response.rowCount > 0

    if (!hasData) {
      throw new CustomError({
        message: `No data in this table`,
        code: `DatabaseError`,
      })
    }

    const data = response.rows[0]

    return data.metadata
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: error.code,
    })
  }
}
