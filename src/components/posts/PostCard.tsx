import React from "react";
import { Card, Button, Popconfirm, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onDelete,
  showActions = true,
}) => {
  const truncatedBody =
    post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body;

  return (
    <Card
      className="card-hover mb-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      title={
        <Link
          href={`/posts/${post.id}`}
          className="text-sm sm:text-base md:text-lg font-medium text-blue-800 hover:text-blue-600"
        >
          {post.title}
        </Link>
      }
      extra={
        <Tag color="blue" icon={<UserOutlined />}>
          <Link href={`/users/${post.user_id}`} className="hover:text-blue-800">
            User #{post.user_id}
          </Link>
        </Tag>
      }
      actions={
        showActions
          ? [
              <Link key="view" href={`/posts/${post.id}`}>
                <Button
                  type="link"
                  icon={<CommentOutlined />}
                  className="text-xs sm:text-sm"
                >
                  View Details
                </Button>
              </Link>,
              <Link key="edit" href={`/posts/edit/${post.id}`}>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  className="text-xs sm:text-sm"
                >
                  Edit
                </Button>
              </Link>,
              <Popconfirm
                key="delete"
                title="Are you sure you want to delete this post?"
                onConfirm={() => onDelete && onDelete(post.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  className="text-xs sm:text-sm"
                >
                  Delete
                </Button>
              </Popconfirm>,
            ]
          : []
      }
    >
      <div className="text-gray-600 text-xs sm:text-sm md:text-base">
        {truncatedBody}
      </div>
    </Card>
  );
};

export default PostCard;
