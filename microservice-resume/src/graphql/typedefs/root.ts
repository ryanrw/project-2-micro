import { gql } from "apollo-server"

export default gql`
  type Query {
    root: String!
  }

  type Mutation {
    root: String!
  }
`
