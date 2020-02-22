import createQuery, { database } from "../../utils/db"
import { UpdatePostOption } from "post"
import { CustomError } from "../../utils/error"

export async function updatePost(postid: number, post: UpdatePostOption) {
  const [_, setExpression] = createQuery.objectToQuery(post)
  const postidParameter = Object.keys(post).length + 1

  const updatePostQuery = createQuery.update({
    table: `posts`,
    set: setExpression,
    where: [`postid=$${postidParameter}`],
  })
  const value = [...Object.values(post), postid]

  try {
    await database.query(updatePostQuery, value)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
