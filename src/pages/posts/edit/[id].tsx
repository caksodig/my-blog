import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Typography, Card, Spin, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

import PostForm from "@/components/posts/PostForm";
import Error from "@/components/common/Error";
import { getPost, updatePost } from "@/services/posts";
import { IPost, IPostInput } from "@/types/posts";

const { Title } = Typography;

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch post details
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<IPost>({
    queryKey: ["post", id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: (postData: IPostInput) => updatePost(Number(id), postData),
    onSuccess: () => {
      message.success("Post updated successfully");
      router.push(`/posts/${id}`);
    },
    onError: (error: any) => {
      const errorMessages = error.response?.data?.data || [];
      if (errorMessages.length > 0) {
        errorMessages.forEach((err: any) => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else {
        message.error(error.response?.data?.message || "Failed to update post");
      }
    },
  });

  const handleSubmit = (values: IPostInput) => {
    updatePostMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !post) {
    return <Error message="Failed to load post details" />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link href={`/posts/${id}`}>
        <span className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
          <ArrowLeftOutlined className="mr-2" />
          Back to Post
        </span>
      </Link>

      <Card className="shadow-md">
        <PostForm
          initialValues={{
            id: post.id,
            title: post.title,
            body: post.body,
            user_id: post.user_id,
          }}
          onSubmit={handleSubmit}
          loading={updatePostMutation.isPending}
          isSubmitting={updatePostMutation.isPending}
          title="Edit Post"
          submitText="Update Post"
        />
      </Card>
    </div>
  );
};

export default EditPostPage;
