import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Typography, Divider } from "antd";
import PostList from "@/components/posts/PostList";
import { usePostList, useDeletePost } from "@/hooks/usePosts";

const { Title } = Typography;

const HomePage: NextPage = () => {
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // Fetch posts with pagination
  const {
    data: postsData,
    isLoading,
    isError,
  } = usePostList({
    page: pagination.current,
    per_page: pagination.pageSize,
  });

  // Delete post mutation
  const deleteMutation = useDeletePost();

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  // Handle post deletion
  const handleDeletePost = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <Head>
        <title>MyBlog - Latest Posts</title>
        <meta
          name="description"
          content="Explore the latest blog posts on Next.js Blog"
        />
      </Head>

      <div>
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="!mb-0">
            Latest Posts
          </Title>
        </div>

        <Divider />

        <PostList
          posts={postsData?.data}
          isLoading={isLoading}
          isError={isError}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: postsData?.meta.pagination.total || 0,
            onChange: handlePaginationChange,
          }}
          onDelete={handleDeletePost}
        />
      </div>
    </>
  );
};

export default HomePage;
