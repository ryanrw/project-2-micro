import root from "./root"
import status from "./status"
import createResumeOnlyOne from "./resume/create"
import Resume from "./resume"
import getResume from "./resume/get"
import deleteResume from "./resume/delete"

export const typeDefs = [
  root,
  status,
  createResumeOnlyOne,
  Resume,
  getResume,
  deleteResume,
]
