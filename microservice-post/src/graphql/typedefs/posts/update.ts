import { gql } from "apollo-server"

export default gql`
  input UpdateArgument {
    title: String
    excerpt: String
    content: String
  }

  extend type Mutation {
    updatePost(postid: Int, post: UpdateArgument): Status
  }
`
