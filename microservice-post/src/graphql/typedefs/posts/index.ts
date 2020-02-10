import { gql } from "apollo-server"

export default gql`
  type Post @key(fields: "postid") {
    postid: Int
    postby: String
    title: String
    excerpt: String
    content: String
    postat: String
  }
`
