// Libery
import { ApolloError } from "apollo-server"

// Services
import { getAllPost } from "@service/posts/get"

export default {
  Query: {
    getAllPost: async () => {
      try {
        const posts = await getAllPost()

        return posts
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
