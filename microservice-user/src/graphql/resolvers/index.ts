// Library
import merge from "lodash.merge"

// Local import
import root from "./root"
import createUser from "./users/create"
import login from "./users/login"
import updateUser from "./users/update"
import deleteUser from "./users/delete"

export const resolvers = merge(
  {},
  root,
  createUser,
  login,
  updateUser,
  deleteUser
)
