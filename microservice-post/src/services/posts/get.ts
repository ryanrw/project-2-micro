// Utility and Helper
import createQuery, { database } from "../../utils/db"
import { CustomError } from "../../utils/error"

// Type and Interface
import { GetPostOption, Post } from "post"

export async function getPost(post: GetPostOption) {
  const [_, whereExpression] = createQuery.objectToQuery(post)

  const getPostQuery = createQuery.select({
    data: ["*"],
    from: ["posts"],
    where: whereExpression,
  })
  const value = Object.values(post)

  try {
    const data = await database.query<Post>(getPostQuery, value)

    const hasData = data.rowCount > 0

    if (!hasData) {
      throw new CustomError({
        message: `Data not found`,
        code: `DatabaseError`,
      })
    }

    const post = data.rows[0]

    return post
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}

export async function getAllPost() {
  const getAllPostQuery = createQuery.select({
    data: ["*"],
    from: ["posts"],
  })

  try {
    const data = await database.query<Post>(getAllPostQuery)

    const posts = data.rows

    return posts
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
