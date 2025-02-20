import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { Typography, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import PostForm from "@/components/posts/PostForm";
import { createPost } from "@/services/posts";
import { IPostInput } from "@/types/posts";
import { Post } from "@/types/posts";

const { Title } = Typography;

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: (postData: IPostInput) => createPost(postData),
    onSuccess: () => {
      message.success("Post created successfully");
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessages = error.response?.data?.data || [];
      if (errorMessages.length > 0) {
        errorMessages.forEach((err: any) => {
          message.error(`${err.field}: ${err.message}`);
        });
      } else {
        message.error(error.response?.data?.message || "Failed to create post");
      }
    },
  });

  const handleSubmit = (values: IPostInput) => {
    createPostMutation.mutate(values);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link href="/">
        <span className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
          <ArrowLeftOutlined className="mr-2" />
          Back to Posts
        </span>
      </Link>

      <Card className="shadow-md">
        <Title level={2} className="mb-6">
          Create New Post
        </Title>
        <PostForm
          onSubmit={handleSubmit}
          loading={createPostMutation.isPending}
          initialValues={undefined}
          submitText="create Post"
        />
      </Card>
    </div>
  );
};

export default CreatePostPage;
