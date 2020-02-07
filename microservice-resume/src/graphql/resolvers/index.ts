// Library
import merge from "lodash.merge"

// Local import
import createResumeOnlyOne from "./resume/create"
import getResume from "./resume/get"
import deleteResume from "./resume/delete"

export const resolvers = merge({}, createResumeOnlyOne, getResume, deleteResume)
