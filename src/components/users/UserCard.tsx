import React from "react";
import { Card, Tag, Badge } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { User } from "@/types";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card
      className="card-hover mb-6"
      title={
        <Link
          href={`/users/${user.id}`}
          className="text-lg font-medium hover:text-blue-600"
        >
          <UserOutlined className="mr-2" />
          {user.name}
        </Link>
      }
      extra={
        <Badge
          status={user.status === "active" ? "success" : "error"}
          text={user.status === "active" ? "Active" : "Inactive"}
        />
      }
    >
      <div className="mb-2">
        <MailOutlined className="mr-2 text-gray-500" />
        <span className="text-gray-700">{user.email}</span>
      </div>

      <div>
        <Tag
          color={
            user.gender === "male"
              ? "blue"
              : user.gender === "female"
              ? "magenta"
              : "purple"
          }
        >
          {user.gender}
        </Tag>
      </div>

      <div className="mt-4">
        <Link
          href={`/users/${user.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          View User Posts →
        </Link>
      </div>
    </Card>
  );
};

export default UserCard;
