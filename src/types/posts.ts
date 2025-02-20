export interface IPost {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface IPostInput {
  user_id: number;
  title: string;
  body: string;
}

export interface IComment {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
}

export interface ICommentInput {
  user_id: number;
  body: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    };
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
