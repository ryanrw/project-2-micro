import { ApolloServer } from "apollo-server"
import { ApolloGateway } from "@apollo/gateway"

import config from "./configs"
import { context } from "./utils/context"

const { userURI, postURI, resumeURI, hostname, port } = config

const gateway = new ApolloGateway({
  serviceList: [
    { name: `user`, url: userURI },
    { name: `post`, url: postURI },
    { name: `resume`, url: resumeURI },
  ],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context,
})

export function startGatewayServer() {
  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
