// Library
import { ApolloError } from "apollo-server"

// Service
import { validate } from "../../../services/users"

// Utility and Helper
import { generateJWT } from "../../../utils/jwt"

// Type and Interface
import { ValidateUserOption } from "users"

export default {
  Query: {
    login: async (_: any, args: ValidateUserOption) => {
      try {
        const { username, password } = args

        const data = await validate({ username, password })

        const jwt = generateJWT({
          userid: data.userid,
          username: data.username,
        })

        return {
          jwt,
        }
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
