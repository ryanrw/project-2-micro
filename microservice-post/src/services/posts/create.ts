// Utility and Helper
import { CustomError } from "@utils/error"
import createQuery, { database } from "@utils/db"

// Type and Interface
import { CreatePostOption } from "post"

export async function createPost(option: CreatePostOption) {
  const { userid, post } = option

  const createPostQuery = createQuery.insert(`posts`, [
    `postby`,
    `title`,
    `excerpt`,
    `content`,
  ])
  const values = [userid, post.title, post.excerpt, post.content]

  try {
    await database.query(createPostQuery, values)
  } catch (error) {
    throw new CustomError({
      message: error.message,
      code: `DatabaseError`,
    })
  }
}
