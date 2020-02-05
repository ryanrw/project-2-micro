import { gql } from "apollo-server"

export default gql`
  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): Status!
  }
`
