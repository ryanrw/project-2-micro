import { gql } from "apollo-server"

export default gql`
  extend type Query {
    login(username: String!, password: String): JWT!
  }
`
