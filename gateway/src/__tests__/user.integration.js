const { createTestClient } = require("apollo-server-testing")

const {
  createMockServer,
  addPayload,
  getLatestPayload,
} = require("./__utils/server")
const {
  createUserQuery,
  loginUserQuery,
  updateUserQuery,
  deleteUserQuery,
} = require("./__utils/query.user")
const { extractJWT } = require("../utils/jwt")

describe("User Service", () => {
  const username = `int-user`
  const email = `int-user@test.com`
  const password = `123456`
  const changedUsername = `change-int-user`

  it("should create a user", async () => {
    const server = createMockServer()

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: createUserQuery,
      variables: {
        username,
        email,
        password,
      },
    })

    const { status } = response.data.createUser

    expect(status).toBe(`success`)
  })

  it("should retrieved a jwt token when login success", async () => {
    const server = createMockServer()
    const { query } = createTestClient(server)

    const response = await query({
      query: loginUserQuery,
      variables: {
        username,
        password,
      },
    })

    const { jwt } = response.data.login

    const payload = extractJWT(jwt)

    expect(payload.username).toBe(username)

    addPayload(payload)
  })

  it("should update username", async () => {
    const payloadFromLoginTest = getLatestPayload()
    const mockContext = () => payloadFromLoginTest

    const server = createMockServer(mockContext)
    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: updateUserQuery,
      variables: {
        username: changedUsername,
      },
    })

    const { jwt } = response.data.updateUser

    const payload = extractJWT(jwt)

    expect(payload.username).toBe(changedUsername)

    addPayload(payload)
  })

  it("should delete currently login user", async () => {
    const payloadFromLoginTest = getLatestPayload()
    const mockContext = () => payloadFromLoginTest

    const server = createMockServer(mockContext)
    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: deleteUserQuery,
    })

    const { status } = response.data.deleteUser

    expect(status).toBe(`Delete user success`)
  })
})
