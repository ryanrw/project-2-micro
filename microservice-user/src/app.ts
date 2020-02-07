import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"
import config from "./configs"
import { typeDefs } from "./graphql/typedefs/"
import { resolvers } from "./graphql/resolvers"

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
