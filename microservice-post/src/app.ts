// One time called module
require("module-alias/register")

// Library
import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"

// Configuration
import config from "@config"

// GraphQL
import { typeDefs } from "@typedef/"
import { resolvers } from "@resolver/"

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
})

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
