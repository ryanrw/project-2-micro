import { gql } from "apollo-server"

export const createPostQuery = gql`
  mutation createPost($title: String!, $excerpt: String!, $content: String!) {
    createPost(title: $title, excerpt: $excerpt, content: $content) {
      status
    }
  }
`

export const getAllPostQuery = gql`
  query getAllPost {
    getAllPost {
      postid
      postby
      title
      excerpt
      content
    }
  }
`

export const getPostQuery = gql`
  query getPost($postid: Int) {
    getPost(postid: $postid) {
      postid
      postby
      title
      excerpt
      content
    }
  }
`

export const updatePostQuery = gql`
  mutation updatePost($postid: Int, $post: UpdateArgument) {
    updatePost(postid: $postid, post: $post) {
      status
    }
  }
`

export const deletePostQuery = gql`
  mutation deletePost($postid: Int!) {
    deletePost(postid: $postid) {
      status
    }
  }
`
