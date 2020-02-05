import { createTestClient } from "apollo-server-testing"

import { constructTestServer } from "./__utils/construct"
import {
  createUserQuery,
  loginUserQuery,
  updateUserQuery,
  deleteUserQuery,
} from "./__utils/query.user"
import { extractJWT } from "../utils/jwt"
import { getUser } from "../services/users"
import { compare } from "../utils/bcrypt"

jest.unmock("pg")

const store = {
  jwt: "",
}

describe(`User service`, () => {
  it("create user `test`", async () => {
    const server = constructTestServer({ context: () => "" })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: createUserQuery,
      variables: {
        username: `test`,
        email: `test@test.com`,
        password: `1234`,
      },
    })

    const { status } = response.data.createUser

    expect(status).toBe(`success`)
  })

  it(`can login and return correctly jwt`, async () => {
    const server = constructTestServer({ context: () => "" })

    const { query } = createTestClient(server)

    const response = await query({
      query: loginUserQuery,
      variables: {
        username: `test`,
        password: `1234`,
      },
    })

    const { jwt } = response.data.login

    const payload = extractJWT(jwt)

    store.jwt = jwt

    expect(payload.username).toBe(`test`)
  })

  it(`can update user information`, async () => {
    const server = constructTestServer({
      context: () => {
        const payload = extractJWT(store.jwt)

        return payload
      },
    })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: updateUserQuery,
      variables: {
        username: "changedtest",
        email: "changed.test@test.com",
        password: "12345",
      },
    })

    const { jwt } = response.data.updateUser

    const payload = extractJWT(jwt)

    expect(payload.username).toBe(`changedtest`)

    const changedData = await getUser({
      userid: payload.userid,
    })

    expect(changedData.username).toBe(`changedtest`)
    expect(changedData.email).toBe(`changed.test@test.com`)

    expect(await compare(`12345`, changedData.password)).toBeTruthy()

    store.jwt = jwt
  })

  it(`can delete user`, async () => {
    const server = constructTestServer({
      context: () => {
        const payload = extractJWT(store.jwt)

        return payload
      },
    })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: deleteUserQuery,
    })

    const { status } = response.data.deleteUser

    expect(status).toBe(`Delete user success`)
  })
})
