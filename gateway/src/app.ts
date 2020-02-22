import { ApolloServer } from "apollo-server"
import { ApolloGateway } from "@apollo/gateway"

import config from "./configs"
import { context, AuthenticationContext } from "./utils/context"

const { userURI, postURI, resumeURI, hostname, port } = config

export const gateway = new ApolloGateway({
  serviceList: [
    { name: `user`, url: userURI },
    { name: `post`, url: postURI },
    { name: `resume`, url: resumeURI },
  ],
  buildService({ url }) {
    return new AuthenticationContext({ url })
  },
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context,
  tracing: true,
})

export function startGatewayServer() {
  server.listen({ hostname, port }).then(({ url }) => {
    console.log(`server start at ${url}`)
  })
}
