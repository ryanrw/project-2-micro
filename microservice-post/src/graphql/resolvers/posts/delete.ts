import { deletePost } from "@service/posts/delete"
import { DeletePostResolverOption } from "post"
// Libery
import { AuthenticationError, ApolloError } from "apollo-server"

// Services
import { checkPostOwner } from "@service/posts/authorization"
import { generateStatus } from "@service/status/generate"

// Types and Interfaces
import { Payload } from "jwt"

export default {
  Mutation: {
    deletePost: async (
      _: any,
      args: DeletePostResolverOption,
      context: Payload
    ) => {
      if (!context.userid) {
        throw new AuthenticationError(`No JWT provided`)
      }

      try {
        await checkPostOwner(args.postid, context.userid)

        await deletePost(args.postid)

        return generateStatus(`Delete post successfully`)
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
