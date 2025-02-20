import {
  Comment,
  CommentInput,
  CommentListResponse,
  PaginationParams,
} from "@/types";
import api, { fetchData, createData, updateData, deleteData } from "./api";
import { IComment, IPaginatedResponse } from "@/types/posts";

// Get paginated list of comments for a post
export const getCommentsByPost = async (
  postId: number,
  params: PaginationParams
) => {
  return fetchData<CommentListResponse>(`/posts/${postId}/comments`, params);
};

export const getPostComments = async (postId: number): Promise<IComment[]> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

// Get a single comment by ID
export const getCommentById = async (id: number) => {
  return fetchData<Comment>(`/comments/${id}`);
};

// Create a new comment
export const createComment = async (commentData: CommentInput) => {
  return createData<Comment>("/comments", commentData);
};

// Update an existing comment
export const updateComment = async (
  id: number,
  commentData: Partial<CommentInput>
) => {
  return updateData<Comment>(`/comments/${id}`, commentData);
};

// Delete a comment
export const deleteComment = async (id: number) => {
  return deleteData(`/comments/${id}`);
};
