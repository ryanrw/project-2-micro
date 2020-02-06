import root from "./root"
import status from "./status"
import JWT from "./jwt"
import post from "./posts"
import createPost from "./posts/create"
import getPost from "./posts/get"
import updatePost from "./posts/update"
import deletePost from "./posts/delete"

export const typeDefs = [
  root,
  status,
  createPost,
  post,
  getPost,
  updatePost,
  deletePost,
]
