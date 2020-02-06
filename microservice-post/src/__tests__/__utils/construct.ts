// Library
import { ApolloServer } from "apollo-server"

// GraphQL
import { typeDefs } from "@typedef/"
import { resolvers } from "@resolver/"
import { context as defaultContext } from "@utils/context"

export const constructTestServer = ({ context = defaultContext } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  return server
}
