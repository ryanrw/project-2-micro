import { database } from "@utils/db"
import { CustomError } from "@utils/error"
import { Post } from "post"

export async function checkPostOwner(postid: number, userid: string) {
  const query = `SELECT postby FROM posts WHERE postid=$1`
  const value = [postid]

  try {
    const response = await database.query<Post>(query, value)

    const hasData = response.rowCount > 0

    if (!hasData) {
      throw new CustomError({
        message: `Post not found`,
        code: `DatabaseError`,
      })
    }

    const owner = response.rows[0].postby

    if (owner !== userid) {
      throw new CustomError({
        message: `This user cannot edit this post`,
        code: `AuthenticationError`,
      })
    }
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: error.code,
    })
  }
}
