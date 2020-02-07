import { gql } from "apollo-server"

import root from "./root"
import status from "./status"
import createUser from "./users/create"
import login from "./users/login"
import JWT from "./jwt"
import updateUser from "./users/update"
import deleteUser from "./users/delete"

const typeDefsList = [
  root,
  status,
  createUser,
  login,
  JWT,
  updateUser,
  deleteUser,
]

export const typeDefs = typeDefsList.reduce(
  (prev, current) => gql`
    ${prev}
    ${current}
  `
)
