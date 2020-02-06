// Library
import merge from "lodash.merge"

// Local import
import root from "./root"
import createPost from "./posts/create"
import getPost from "./posts/get"
import getAllPost from "./posts/get-all"
import updatePost from "./posts/update"
import deletePost from "./posts/delete"

export const resolvers = merge(
  {},
  root,
  createPost,
  getPost,
  getAllPost,
  updatePost,
  deletePost
)
