import create from "../graphql/resolvers/users/create"
import login from "../graphql/resolvers/users/login"
import update from "../graphql/resolvers/users/update"
import deleteUser from "../graphql/resolvers/users/delete"
import { encrypt } from "@utils/bcrypt"
import { extractJWT } from "@utils/jwt"
import { Payload } from "jwt"

jest.mock("pg")

const user = {
  username: `test`,
  email: `test@test.com`,
  password: `1234`,
}

const store = {
  jwt: "",
}

const mockContext: Payload = {
  userid: `id1234`,
  username: `test`,
}

afterEach(() => {
  require("pg").__clearMockData()
})

describe("User resolver", () => {
  it(`can create user`, async () => {
    const response = await create.Mutation.createUser(null, {
      ...user,
    })

    expect(response.status).toBe(`success`)
  })

  it(`can login using user info`, async () => {
    const someHash = await encrypt(user.password)

    require("pg").__mockReturnData([
      { userid: `id1234`, username: user.username, password: someHash },
    ])

    const response = await login.Query.login(null, {
      username: user.username,
      password: user.password,
    })

    const payload = extractJWT(response.jwt)

    expect(payload.userid).toBe(`id1234`)
    expect(payload.username).toBe(`test`)

    store.jwt = response.jwt
  })

  it(`can update user info`, async () => {
    const someHash = encrypt(`1234`)
    const changedName = `changedName`

    require("pg").__mockReturnData([
      { userid: `id1234`, username: changedName, password: someHash },
    ])

    const response = await update.Mutation.updateUser(
      null,
      {
        username: changedName,
      },
      mockContext
    )

    const payload = extractJWT(response.jwt)

    expect(payload.userid).toBe(`id1234`)
    expect(payload.username).toBe(changedName)

    store.jwt = response.jwt
  })

  it(`can delete user`, async () => {
    const response = await deleteUser.Mutation.deleteUser(
      null,
      null,
      mockContext
    )

    expect(response.status).toBe(`Delete user success`)
  })
})
