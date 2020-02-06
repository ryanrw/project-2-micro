import createQuery, { database } from "@utils/db"
import { CustomError } from "@utils/error"

export async function deletePost(postid: number) {
  const deletePostQuery = createQuery.delete({
    table: `posts`,
    where: [`postid=$1`],
  })
  const value = [postid]

  try {
    await database.query(deletePostQuery, value)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
