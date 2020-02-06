import { updatePost } from "@service/posts/update"
import { UpdatePostResolverOption } from "post"
import { Payload } from "jwt"
import { checkPostOwner } from "@service/posts/authorization"
import { ApolloError, AuthenticationError } from "apollo-server"
import { generateStatus } from "@service/status/generate"

export default {
  Mutation: {
    updatePost: async (
      _: any,
      args: UpdatePostResolverOption,
      context: Payload
    ) => {
      if (!context.userid) {
        throw new AuthenticationError(`No JWT provided`)
      }

      try {
        await checkPostOwner(args.postid, context.userid)

        await updatePost(args.postid, args.post)

        return generateStatus(`Update post success`)
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    },
  },
}
