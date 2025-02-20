import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from "@/services/comments";
import { CommentInput, PaginationParams } from "@/types";

// Hook for fetching comments for a post
export const usePostComments = (postId: number, params: PaginationParams) => {
  return useQuery({
    queryKey: ["comments", postId, params],
    queryFn: () => getCommentsByPost(postId, params),
    enabled: !!postId,
    placeholderData: (prevData) => prevData,
  });
};

// Hook for creating a new comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentInput) => createComment(data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch comments for the post
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.post_id],
      });
      message.success("Comment added successfully");
    },
    onError: () => {
      message.error("Failed to add comment");
    },
  });
};

// Hook for deleting a comment
export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      // Invalidate and refetch comments for the post
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      message.success("Comment deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete comment");
    },
  });
};
