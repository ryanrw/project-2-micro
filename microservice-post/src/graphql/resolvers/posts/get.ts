// Libery
import { ApolloError } from "apollo-server"

// Services
import { getPost } from "@service/posts/get"

// Types and Interfaces
import { GetPostOption } from "post"

export default {
  Query: {
    getPost: async (_: any, args: GetPostOption) => {
      try {
        const post = await getPost(args)

        return post
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
