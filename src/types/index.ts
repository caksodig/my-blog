export interface User {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  status: "active" | "inactive";
}

export interface UserListResponse {
  data: User[];
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
  user_id: number;
  title: string;
  body: string;
}

interface Meta {
  pagination: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface PostListResponse {
  data: Post[];
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    };
  };
}

export interface PostInput {
  title: string;
  body: string;
  user_id: number;
}

// Comment Types
export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentListResponse {
  data: Comment[];
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    };
  };
}

export interface CommentInput {
  post_id: number;
  name: string;
  email: string;
  body: string;
}

// Common API Types
export interface ApiError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  data: ApiError[];
}

// Pagination Types
export interface PaginationParams {
  page: number;
  per_page: number;
  limit?: number;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: { pagination: Pagination };
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
