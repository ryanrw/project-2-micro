import { ApolloServer, gql } from "apollo-server"
import config from "./configs"

const typeDefs = gql`
  type Query {
    test: String
  }
`

const resolvers = {
  Query: {
    test: () => "query ok",
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

export function startServer() {
  const { hostname, port } = config

  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
