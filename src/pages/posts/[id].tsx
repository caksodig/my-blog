import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Input,
  List,
  Spin,
  message,
  Modal,
  Typography,
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import Layout from "@/components/layout/Layout";
import Error from "@/components/common/Error";
import { getPost, deletePost } from "@/services/posts";
import { getPostComments, createComment } from "@/services/comments";
import { IPost, IComment } from "@/types/posts";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [commentBody, setCommentBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch post details
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery<IPost>({
    queryKey: ["post", id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
  });

  // Fetch post comments
  const { data: comments, isLoading: commentsLoading } = useQuery<IComment[]>({
    queryKey: ["comments", id],
    queryFn: () => getPostComments(Number(id)),
    enabled: !!id,
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      message.success("Post deleted successfully");
      router.push("/");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to delete post");
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: ({ post_id, body }: { post_id: number; body: string }) =>
      createComment({ post_id, body }),
    onSuccess: () => {
      message.success("Comment added successfully");
      setCommentBody("");
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to add comment");
    },
  });

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (id) {
      deletePostMutation.mutate(Number(id));
    }
    setIsModalOpen(false);
  };

  const handleAddComment = () => {
    if (commentBody.trim() && id) {
      addCommentMutation.mutate({
        post_id: Number(id),
        body: commentBody,
      });
    } else {
      message.warning("Please enter a comment");
    }
  };

  if (postLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (postError || !post) {
    return <Error message="Failed to load post details" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Post details */}
      <Card
        className="mb-8 shadow-md"
        actions={[
          <Link href={`/posts/edit/${id}`} key="edit">
            <Button type="link" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>,
          <Button
            key="delete"
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <Title level={2}>{post.title}</Title>
        <div className="flex items-center mb-4">
          <Link href={`/users/${post.user_id}`}>
            <span className="flex items-center text-blue-500 hover:underline">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <Text>Author ID: {post.user_id}</Text>
            </span>
          </Link>
        </div>
        <Paragraph className="text-lg whitespace-pre-line">
          {post.body}
        </Paragraph>
      </Card>

      {/* Comments section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Title level={4} className="flex items-center mb-4">
          <CommentOutlined className="mr-2" />
          Comments
        </Title>

        {/* Add comment form */}
        <div className="mb-6">
          <TextArea
            rows={4}
            placeholder="Write a comment..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            className="mb-2"
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            loading={addCommentMutation.isPending}
          >
            Add Comment
          </Button>
        </div>

        {/* Comments list */}
        {commentsLoading ? (
          <div className="text-center py-4">
            <Spin />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={comments || []}
            locale={{
              emptyText: "No comments yet. Be the first to comment!",
            }}
            renderItem={(comment) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<Text strong>User ID: {comment.user_id}</Text>}
                  description={comment.body}
                />
              </List.Item>
            )}
          />
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default PostDetailPage;
