import { gql } from "apollo-server"

export default gql`
  extend type Query {
    getAllPost: [Post]
    getPost(postid: Int, title: String): Post
  }
`
