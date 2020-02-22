import { deleteResume } from "../../../services/resume/delete"
import { Payload } from "jwt"
import { AuthenticationError, ApolloError } from "apollo-server"
import { generateStatus } from "../../../services/status/generate"

export default {
  Mutation: {
    deleteResume: async (_: any, _args: any, context: Payload) => {
      if (!context.userid) {
        throw new AuthenticationError(`No JWT provided!`)
      }

      try {
        await deleteResume()

        return generateStatus(`Delete resume successfully!`)
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
