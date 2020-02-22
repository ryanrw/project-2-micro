import { Payload } from "jwt"
import create from "../graphql/resolvers/resume/create"
import get from "../graphql/resolvers/resume/get"
import deleteResume from "../graphql/resolvers/resume/delete"
import { data } from "../services/resume/data"

jest.mock("pg")

const mockContext: Payload = {
  userid: `id1234`,
  username: `test`,
}

afterEach(() => {
  require("pg").__clearMockData()
})

describe(`Resume resolver`, () => {
  it("can create resume", async () => {
    const response = await create.Mutation.createResumeOnlyOne(
      null,
      null,
      mockContext
    )

    expect(response.status).toBe(
      `Create resume successfully, don't run this function again.`
    )
  })

  it("can get resume", async () => {
    require("pg").__mockReturnData([
      {
        metadata: data,
      },
    ])

    const response = await get.Query.getResume()

    expect(response).toEqual(data)
  })

  it("can delete resume", async () => {
    const response = await deleteResume.Mutation.deleteResume(
      null,
      null,
      mockContext
    )

    expect(response.status).toBe(`Delete resume successfully!`)
  })
})
