// Library
import merge from "lodash.merge"

// Local import
import root from "./root"
import createResumeOnlyOne from "./resume/create"
import getResume from "./resume/get"
import deleteResume from "./resume/delete"

export const resolvers = merge(
  {},
  root,
  createResumeOnlyOne,
  getResume,
  deleteResume
)
