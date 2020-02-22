// Library
import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"
import { Request } from "express"

// Configuration
import config from "./configs"

// GraphQL
import { typeDefs } from "./graphql/typedefs"
import { resolvers } from "./graphql/resolvers"

// types and interfaces
import { Payload } from "jwt"
import { CustomHeaderReq } from "header"

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }: { req: CustomHeaderReq }): Payload => {
    return {
      userid: req.headers["x-user-id"],
      username: req.headers["x-username"],
    }
  },
})

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
