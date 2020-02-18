import { Payload } from "jwt"
import create from "../graphql/resolvers/posts/create"
import getAll from "../graphql/resolvers/posts/get-all"
import get from "../graphql/resolvers/posts/get"
import update from "../graphql/resolvers/posts/update"
import deletePost from "../graphql/resolvers/posts/delete"
import { PostResolverParam } from "post"
import { mockPost } from "./__utils/mock-post"

jest.mock("pg")

const post: PostResolverParam = {
  title: `title`,
  excerpt: `excerpt`,
  content: `content`,
}

const firstPost = mockPost({
  postid: 1,
  postby: `id1234`,
})

const secondPost = mockPost({
  postid: 2,
  postby: `id1234`,
})

const mockContext: Payload = {
  userid: `id1234`,
  username: `test`,
}

afterEach(() => {
  require("pg").__clearMockData()
})

describe(`Post resolver`, () => {
  it(`can create post`, async () => {
    const response = await create.Mutation.createPost(null, post, mockContext)

    expect(response.status).toBe(`Add post successfully!`)
  })

  it(`can get all post`, async () => {
    require("pg").__mockReturnData([firstPost, secondPost])

    const response = await getAll.Query.getAllPost()

    response.forEach((post, index) => {
      const postid = index + 1

      expect(post.postid).toBe(postid)
      expect(post.postby).toBe(`id1234`)
      expect(post.title).toBe(`title ${postid}`)
      expect(post.excerpt).toBe(`excerpt ${postid}`)
      expect(post.content).toBe(`content ${postid}`)
    })
  })

  it(`can get single post`, async () => {
    require("pg").__mockReturnData([firstPost])

    const postid = 1

    const response = await get.Query.getPost(null, { postid })

    expect(response.postid).toBe(postid)
    expect(response.postby).toBe(`id1234`)
    expect(response.title).toBe(`title ${postid}`)
    expect(response.excerpt).toBe(`excerpt ${postid}`)
    expect(response.content).toBe(`content ${postid}`)
  })

  it(`can update post`, async () => {
    const changedTitle = `changed title`

    require("pg").__mockReturnData([
      {
        postid: 1,
        postby: `id1234`,
        title: changedTitle,
        excerpt: `excerpt 1`,
        content: `content 1`,
        postat: Date.now().toLocaleString(),
      },
    ])

    const response = await update.Mutation.updatePost(
      null,
      {
        postid: 1,
        post: {
          title: changedTitle,
        },
      },
      mockContext
    )

    expect(response.status).toBe(`Update post success`)
  })

  it(`can delete post`, async () => {
    require("pg").__mockReturnData([firstPost])

    const response = await deletePost.Mutation.deletePost(
      null,
      {
        postid: 1,
      },
      mockContext
    )

    expect(response.status).toBe(`Delete post successfully`)
  })
})
