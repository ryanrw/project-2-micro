import { gql } from "apollo-server"

export default gql`
  extend type Mutation {
    updateUser(username: String, email: String, password: String): JWT
  }
`
