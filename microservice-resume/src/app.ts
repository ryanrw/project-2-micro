// One time called module
require("module-alias/register")

// Library
import { ApolloServer } from "apollo-server"

// Configuration
import config from "@config"

// GraphQL
import { typeDefs } from "@typedef/"
import { resolvers } from "@resolver/"

// Utility and Helper
import { context } from "@utils/context"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
