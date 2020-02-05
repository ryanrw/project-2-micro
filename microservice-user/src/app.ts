import { ApolloServer } from "apollo-server"
import config from "./configs"
import { typeDefs } from "./graphql/typedefs/"
import { resolvers } from "./graphql/resolvers"
import { context } from "./utils/context"

const server = new ApolloServer({ typeDefs, resolvers, context })

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
