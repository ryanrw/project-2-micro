import { Post } from "post"

export function mockPost({
  postid,
  postby,
}: {
  postid: number
  postby: string
}): Post {
  return {
    postid: postid,
    postby: postby,
    title: `title ${postid}`,
    excerpt: `excerpt ${postid}`,
    content: `content ${postid}`,
    postat: Date.now().toLocaleString(),
  }
}
