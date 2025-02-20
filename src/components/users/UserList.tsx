import React from "react";
import { Row, Col, Empty, Alert } from "antd";
import UserCard from "./UserCard";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
import { User } from "@/types";

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  isError: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  isError,
  pagination,
}) => {
  if (isLoading) {
    return <Loading text="Loading users..." />;
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Error"
        description="Failed to load users. Please try again later."
        className="my-6"
      />
    );
  }

  if (!users || users.length === 0) {
    return <Empty description="No users found" className="my-10" />;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col xs={24} sm={12} lg={8} key={user.id}>
            <UserCard user={user} />
          </Col>
        ))}
      </Row>

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={pagination.onChange}
      />
    </div>
  );
};

export default UserList;
