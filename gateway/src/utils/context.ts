// Library
import { Request } from "express"

// Local import
import { extractJWT } from "./jwt"
import { Payload } from "src/types/jwt"
import { RemoteGraphQLDataSource } from "@apollo/gateway"

export class AuthenticationContext extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: { request: any; context: any }) {
    request.http.headers.set("x-user-id", context.userid)
    request.http.headers.set("x-username", context.username)
  }
}

export function context({ req }: { req: Request }): Payload {
  const authorization = req.headers.authorization || ""

  if (authorization) {
    const jwt = authorization.replace("Bearer ", "")

    const payload = extractJWT(jwt)

    return payload
  }

  return {
    userid: "",
    username: "",
  }
}
