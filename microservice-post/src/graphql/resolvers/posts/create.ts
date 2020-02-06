// Library
import { AuthenticationError, ApolloError } from "apollo-server"

// Service
import { createPost } from "@service/posts/create"
import { generateStatus } from "@service/status/generate"

// Type and Interface
import { PostResolverParam } from "post"
import { Payload } from "jwt"

export default {
  Mutation: {
    createPost: async (
      _parent: any,
      args: PostResolverParam,
      context: Payload
    ) => {
      if (!context.userid) {
        throw new AuthenticationError(`No jwt provide`)
      }

      try {
        await createPost({
          userid: context.userid,
          post: args,
        })

        return generateStatus(`Add post successfully!`)
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
