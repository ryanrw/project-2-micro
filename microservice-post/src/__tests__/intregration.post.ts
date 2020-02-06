import { createTestClient } from "apollo-server-testing"

import { constructTestServer } from "./__utils/construct"
import {
  createPostQuery,
  getAllPostQuery,
  getPostQuery,
  updatePostQuery,
  deletePostQuery,
} from "./__utils/query.post"
import { extractJWT, generateJWT } from "@utils/jwt"
import { database } from "@utils/db"

jest.unmock("pg")

// For local test environment
afterAll(async () => {
  const query = `ALTER SEQUENCE posts_post_id_seq RESTART WITH 1`

  await database.query(query)
})

const store = {
  jwt: "",
}

describe(`Post service`, () => {
  it("construct the user and get JWT token", async () => {
    const jwt = generateJWT({
      userid: "8c63cc7a-54f3-4c7a-825d-ac280df3671b",
      username: "posttester",
    })

    const payload = extractJWT(jwt)

    expect(payload.username).toBe(`posttester`)

    store.jwt = jwt
  })

  it("can create a post", async () => {
    const server = constructTestServer({
      context: () => extractJWT(store.jwt),
    })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: createPostQuery,
      variables: {
        title: `test title`,
        excerpt: `test excerpt`,
        content: `test content`,
      },
    })

    const secondResponse = await mutate({
      mutation: createPostQuery,
      variables: {
        title: `test title 2`,
        excerpt: `test excerpt 2`,
        content: `test content 2`,
      },
    })

    const { status } = response.data.createPost
    const secondStatus = secondResponse.data.createPost.status

    expect(status).toBe(`Add post successfully!`)
    expect(secondStatus).toBe(`Add post successfully!`)
  })

  it("can get all post", async () => {
    const server = constructTestServer({ context: () => "" })

    const { query } = createTestClient(server)

    const response = await query({
      query: getAllPostQuery,
    })

    const posts = response.data.getAllPost
    const payload = extractJWT(store.jwt)
    const firstPost = JSON.stringify(posts[0])
    const testCase = JSON.stringify({
      postid: 1,
      postby: payload.userid,
      title: "test title",
      excerpt: "test excerpt",
      content: "test content",
    })

    expect(posts.length).toBe(2)
    expect(firstPost).toEqual(testCase)
  })

  it("can get single post", async () => {
    const server = constructTestServer({ context: () => "" })

    const { query } = createTestClient(server)

    const response = await query({
      query: getPostQuery,
      variables: {
        postid: 2,
      },
    })

    const payload = extractJWT(store.jwt)
    const post = JSON.stringify(response.data.getPost)
    const testCase = JSON.stringify({
      postid: 2,
      postby: payload.userid,
      title: `test title 2`,
      excerpt: `test excerpt 2`,
      content: `test content 2`,
    })

    expect(post).toEqual(testCase)
  })

  it("can update post", async () => {
    const server = constructTestServer({
      context: () => extractJWT(store.jwt),
    })

    const { mutate, query } = createTestClient(server)

    const response = await mutate({
      mutation: updatePostQuery,
      variables: {
        postid: 1,
        post: { title: "Updated Title" },
      },
    })

    const { status } = response.data.updatePost

    expect(status).toBe(`Update post success`)

    const secondResponse = await query({
      query: getPostQuery,
      variables: {
        postid: 1,
      },
    })

    const post = secondResponse.data.getPost

    expect(post.title).toBe(`Updated Title`)
  })

  it("can delete post (with all post which is created by this test)", async () => {
    const server = constructTestServer({
      context: () => extractJWT(store.jwt),
    })

    const { mutate } = createTestClient(server)

    const response = await mutate({
      mutation: deletePostQuery,
      variables: {
        postid: 1,
      },
    })

    const { status } = response.data.deletePost

    expect(status).toBe(`Delete post successfully`)

    await mutate({
      mutation: deletePostQuery,
      variables: {
        postid: 2,
      },
    })
  })
})
