import { Payload } from "jwt"

import { ApolloServer } from "apollo-server"
import { Request } from "express"

import { gateway } from "../../app"
import { context as defaultContext } from "../../utils/context"

export function createMockServer(context = defaultContext) {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context,
  })

  return server
}

const payloads: Payload[] = []

export function addPayload(payload: Payload) {
  payloads.push(payload)
}

export function getLatestPayload(): Payload {
  const currentPayloads: Payload[] = [...payloads]

  return currentPayloads.pop()
}
