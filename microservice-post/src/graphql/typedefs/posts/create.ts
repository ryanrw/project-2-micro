import { gql } from "apollo-server"

export default gql`
  extend type Mutation {
    createPost(title: String!, excerpt: String!, content: String!): Status
  }
`
