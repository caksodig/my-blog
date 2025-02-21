import api from "./api";
import { IPost, IPostInput, IPaginatedResponse } from "@/types/posts";
import { PaginationParams } from "@/types";

// Get paginated posts
export const getPosts = async ({
  page = 1,
  limit = 10,
}: PaginationParams): Promise<IPaginatedResponse<IPost>> => {
  const response = await api.get(`/posts?page=${page}&per_page=${limit}`);

  const totalCount = parseInt(response.headers["x-pagination-total"] || "0");
  const pageCount = parseInt(response.headers["x-pagination-pages"] || "0");

  return {
    data: response.data,
    meta: {
      pagination: {
        total: totalCount,
        pages: pageCount,
        page,
        limit,
      },
    },
  };
};

// Get a single post by ID
export const getPost = async (id: number): Promise<IPost> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Create a new post
export const createPost = async (postData: IPostInput): Promise<IPost> => {
  const response = await api.post("/posts", {
    ...postData,
    user_id: postData.user_id,
  });
  return response.data;
};

// Update an existing post
export const updatePost = async (
  id: number,
  postData: IPostInput
): Promise<IPost> => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

// Delete a post
export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

// Get posts by user ID
export const getUserPosts = async (
  userId: number,
  page = 1,
  limit = 10
): Promise<IPaginatedResponse<IPost>> => {
  const response = await api.get(
    `/users/${userId}/posts?page=${page}&per_page=${limit}`
  );

  // Extract pagination info from headers
  const totalCount = parseInt(response.headers["x-pagination-total"] || "0");
  const pageCount = parseInt(response.headers["x-pagination-pages"] || "0");

  return {
    data: response.data,
    meta: {
      pagination: {
        total: totalCount,
        pages: pageCount,
        page: page,
        limit: limit,
      },
    },
  };
};

// Get a single post by ID (same as getPost)
export const getPostById = async (id: number): Promise<IPost> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Get posts by user ID (same as getUserPosts)
export const getPostsByUser = async (
  userId: number,
  { page = 1, limit = 10 }: PaginationParams
): Promise<IPaginatedResponse<IPost>> => {
  const response = await api.get(
    `/users/${userId}/posts?page=${page}&per_page=${limit}`
  );

  const totalCount = parseInt(response.headers["x-pagination-total"] || "0");
  const pageCount = parseInt(response.headers["x-pagination-pages"] || "0");

  return {
    data: response.data,
    meta: {
      pagination: {
        total: totalCount,
        pages: pageCount,
        page,
        limit,
      },
    },
  };
};
