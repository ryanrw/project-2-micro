const { createTestClient } = require("apollo-server-testing")

const {
  createMockServer,
  addPayload,
  getLatestPayload,
} = require("./__utils/server")
const {
  createUserQuery,
  loginUserQuery,
  deleteUserQuery,
} = require("./__utils/query.user")
const {
  createPostQuery,
  getAllPostQuery,
  getPostQuery,
  updatePostQuery,
  deletePostQuery,
} = require("./__utils/query.post")
const { extractJWT } = require("../utils/jwt")

const username = `int-user`
const password = `123456`

describe("Post Service", () => {
  const postTemplate = {
    title: `test title`,
    excerpt: `test excerpt`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ante at vestibulum interdum. Phasellus vitae rhoncus sapien. Nam vehicula ipsum ipsum, vitae pretium libero tincidunt ut.`,
  }

  it("should create user for test", async () => {
    const server = createMockServer()

    const { query, mutate } = createTestClient(server)

    await query({
      query: createUserQuery,
      variables: {
        username,
        email: "onlytest",
        password,
      },
    })

    const response = await mutate({
      mutation: loginUserQuery,
      variables: {
        username,
        password,
      },
    })

    const { jwt } = response.data.login

    const payload = extractJWT(jwt)

    addPayload(payload)
  })

  it("should create a post", async () => {
    const payload = getLatestPayload()
    const context = () => payload

    const server = createMockServer(context)

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: createPostQuery,
      variables: {
        ...postTemplate,
      },
    })

    const { status } = response.data.createPost

    expect(status).toBe(`Add post successfully!`)
  })

  it("should get all post", async () => {
    const server = createMockServer()

    const { query } = createTestClient(server)

    const response = await query({
      query: getAllPostQuery,
    })

    const posts = response.data.getAllPost

    expect(Array.isArray(posts)).toBeTruthy()

    const post = posts[0]

    expect(post.title).toBe(postTemplate.title)
    expect(post.excerpt).toBe(postTemplate.excerpt)
    expect(post.content).toBe(postTemplate.content)
  })

  it("should get a selected post", async () => {
    const server = createMockServer()

    const { query } = createTestClient(server)

    const response = await query({
      query: getPostQuery,
      variables: {
        postid: 1,
      },
    })

    const post = response.data.getPost

    expect(post.title).toBe(postTemplate.title)
    expect(post.excerpt).toBe(postTemplate.excerpt)
    expect(post.content).toBe(postTemplate.content)
  })

  it("should update a post", async () => {
    const payloadFromLoginTest = getLatestPayload()
    const mockContext = () => payloadFromLoginTest

    const server = createMockServer(mockContext)
    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: updatePostQuery,
      variables: {
        postid: 1,
        post: {
          title: "changed",
        },
      },
    })

    const { status } = response.data.updatePost

    expect(status).toBe(`Update post success`)
  })

  it("should delete a post", async () => {
    const payloadFromLoginTest = getLatestPayload()
    const mockContext = () => payloadFromLoginTest

    const server = createMockServer(mockContext)
    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: deletePostQuery,
      variables: {
        postid: 1,
      },
    })

    const { status } = response.data.deletePost

    expect(status).toBe(`Delete post successfully`)
  })
})
