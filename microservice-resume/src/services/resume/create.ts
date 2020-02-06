import { database } from "@utils/db"
import { checkDataExist } from "./check-data-exist"
import { data } from "./data"
import { CustomError } from "@utils/error"

export async function createResume() {
  // YOLO - YOU LCREATE (RESUMÉ) ONLY ONE
  await checkDataExist()

  const stringifyData = JSON.stringify(data)

  const query = `INSERT INTO resume (metadata) VALUES('${stringifyData}'::jsonb)`

  try {
    await database.query(query)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
