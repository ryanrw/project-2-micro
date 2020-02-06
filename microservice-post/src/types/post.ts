export interface Post {
  postid: number
  postby: string
  title: string
  excerpt: string
  content: string
  postat: string
}

export interface PostResolverParam {
  title: string
  excerpt: string
  content: string
}

export interface CreatePostOption {
  userid: string
  post: PostResolverParam
}

export interface GetPostOption {
  postid?: number
  title?: string
}

export interface UpdatePostOption {
  title?: string
  excerpt?: string
  content?: string
}

export interface UpdatePostResolverOption {
  postid: number
  post: UpdatePostOption
}

export interface DeletePostResolverOption {
  postid: number
}
