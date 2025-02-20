import React from "react";
import { Empty, Alert } from "antd";
import PostCard from "./PostCard";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
import { Post } from "@/types";

interface PostListProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onDelete?: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading,
  isError,
  pagination,
  onDelete,
}) => {
  if (isLoading) {
    return <Loading text="Loading posts..." />;
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Error"
        description="Failed to load posts. Please try again later."
        className="my-6"
      />
    );
  }

  if (!posts || posts.length === 0) {
    return <Empty description="No posts found" className="my-10" />;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={pagination.onChange}
      />
    </div>
  );
};

export default PostList;
