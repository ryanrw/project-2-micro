// Library
import { ApolloServer } from "apollo-server"

// GraphQL
import { typeDefs } from "../../graphql/typedefs"
import { resolvers } from "../../graphql/resolvers"
import { context as defaultContext } from "../../utils/context"

export const constructTestServer = ({ context = defaultContext } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })

  return server
}
