// Library
import { ApolloError } from "apollo-server"

import { Payload } from "jwt"
import { createResume } from "@service/resume/create"
import { generateStatus } from "@service/status/generate"

export default {
  Mutation: {
    createResumeOnlyOne: async (_: any, _arg: any, _context: Payload) => {
      try {
        await createResume()

        return generateStatus(
          `Create resume successfully, don't run this function again.`
        )
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
