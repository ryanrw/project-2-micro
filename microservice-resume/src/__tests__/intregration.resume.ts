import { constructTestServer } from "./__utils/construct"
import { createTestClient } from "apollo-server-testing"
import {
  createResumeOnlyOneQuery,
  getResumeQuery,
  deleteResumeQuery,
} from "./__utils/query.resume"
import { data } from "@service/resume/data"
import { Payload } from "jwt"

jest.unmock("pg")

const mockContext: Payload = {
  userid: `id1234`,
  username: `test`,
}

describe(`Resume service`, () => {
  it(`can create resume`, async () => {
    const server = constructTestServer({ context: () => mockContext })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: createResumeOnlyOneQuery,
    })

    const { status } = response.data.createResumeOnlyOne

    expect(status).toBe(
      `Create resume successfully, don't run this function again.`
    )
  })

  it(`can get resume`, async () => {
    const server = constructTestServer({ context: () => mockContext })

    const { query } = createTestClient(server)

    const response = await query({
      query: getResumeQuery,
    })

    const resume = response.data.getResume
    const testCase = data

    expect(resume).toEqual(testCase)
  })

  it(`can delete resume`, async () => {
    const server = constructTestServer({ context: () => mockContext })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: deleteResumeQuery,
    })

    const { status } = response.data.deleteResume

    expect(status).toBe(`Delete resume successfully!`)
  })
})
