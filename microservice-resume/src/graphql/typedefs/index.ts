import { gql } from "apollo-server"

import status from "./status"
import createResumeOnlyOne from "./resume/create"
import Resume from "./resume"
import getResume from "./resume/get"
import deleteResume from "./resume/delete"

export const typeDefsList = [
  status,
  createResumeOnlyOne,
  Resume,
  getResume,
  deleteResume,
]

export const typeDefs = typeDefsList.reduce(
  (prev, current) => gql`
    ${prev}
    ${current}
  `
)
