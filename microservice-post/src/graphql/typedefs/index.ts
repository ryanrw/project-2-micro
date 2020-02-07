import { gql } from "apollo-server"

import status from "./status"
import post from "./posts"
import createPost from "./posts/create"
import getPost from "./posts/get"
import updatePost from "./posts/update"
import deletePost from "./posts/delete"

export const typeDefsList = [
  status,
  createPost,
  post,
  getPost,
  updatePost,
  deletePost,
]

export const typeDefs = typeDefsList.reduce(
  (prev, current) => gql`
    ${prev}
    ${current}
  `
)
