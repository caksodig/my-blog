import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Typography,
  Divider,
  Card,
  Descriptions,
  Badge,
  Skeleton,
  Alert,
  Button,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PostList from "@/components/posts/PostList";
import { useUser } from "@/hooks/useUsers";
import { useUserPosts, useDeletePost } from "@/hooks/usePosts";

const { Title } = Typography;

const UserDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id as string);

  // Pagination state for posts
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Fetch user details
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useUser(userId);

  // Fetch user posts with pagination
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useUserPosts(userId, {
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

  // Error state
  if (isErrorUser) {
    return (
      <Alert
        type="error"
        message="Error"
        description="Failed to load user. The user may not exist or there was a network error."
        className="my-6"
      />
    );
  }

  return (
    <>
      <Head>
        <title>
          {user ? `${user.name} - NextBlog` : "User Profile - NextBlog"}
        </title>
        <meta
          name="description"
          content={
            user
              ? `View profile and posts by ${user.name}`
              : "User profile page"
          }
        />
      </Head>

      <div>
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => router.back()}
          className="mb-4 pl-0"
        >
          Back
        </Button>

        {isLoadingUser ? (
          <Card>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </Card>
        ) : user ? (
          <>
            <Card className="mb-8">
              <Title level={2}>{user.name}</Title>
              <Descriptions bordered>
                <Descriptions.Item label="Email">
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge
                    status={user.status === "active" ? "success" : "error"}
                    text={user.status === "active" ? "Active" : "Inactive"}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {user.gender}
                </Descriptions.Item>
                <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Title level={3}>Posts by {user.name}</Title>
            <Divider />

            <PostList
              posts={postsData?.data}
              isLoading={isLoadingPosts}
              isError={isErrorPosts}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: postsData?.meta.pagination.total || 0,
                onChange: handlePaginationChange,
              }}
              onDelete={handleDeletePost}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserDetailPage;
