import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  getPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
} from "@/services/posts";
import {
  Post,
  PostInput,
  ApiResponse,
  PaginationParams,
  PostListResponse,
} from "@/types";

// Hook for fetching posts with pagination
export const usePostList = (params: PaginationParams) => {
  return useQuery<PostListResponse>({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params), // Perbaikan: getPosts menerima objek params
    placeholderData: (prevData) =>
      prevData ?? {
        data: [],
        meta: { pagination: { total: 0, pages: 0, page: 1, limit: 10 } },
      },
  });
};

// Hook for fetching a single post
export const usePost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};

// Hook for fetching posts by user
export const useUserPosts = (userId: number, params: PaginationParams) => {
  return useQuery({
    queryKey: ["userPosts", userId, params],
    queryFn: () => getPostsByUser(userId, params), // Perbaikan: userId dipisahkan dari params
    enabled: !!userId,
    placeholderData: (prevData) => prevData,
  });
};
// Hook for creating a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostInput) => createPost(data),
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post created successfully");
    },
    onError: () => {
      message.error("Failed to create post");
    },
  });
};

// Hook for updating a post
export const useUpdatePost = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PostInput>) => {
      if (typeof data.user_id === "undefined") {
        throw new Error("user_id is required");
      }
      return updatePost(id, data as PostInput);
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["post", id], updatedPost);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post updated successfully");
    },
    onError: () => {
      message.error("Failed to update post");
    },
  });
};

// Hook for deleting a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete post");
    },
  });
};
