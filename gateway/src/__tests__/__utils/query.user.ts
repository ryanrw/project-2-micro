import gql from "graphql-tag"

export const createUserQuery = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      status
    }
  }
`

export const loginUserQuery = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      jwt
    }
  }
`

export const updateUserQuery = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      jwt
    }
  }
`

export const deleteUserQuery = gql`
  mutation deleteUser {
    deleteUser {
      status
    }
  }
`
