// Library
import { ApolloError } from "apollo-server"

// Service
import { createUser as create } from "../../../services/users/"
import { generateStatus } from "../../../services/status/generate"

// Type and Interface
import { User } from "users"

export default {
  Mutation: {
    createUser: async (_: any, args: User) => {
      try {
        await create(args)

        return generateStatus(`success`)
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
