import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Table, Tag, Button, Typography, Input } from "antd";
import { SearchOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { ColumnsType } from "antd/es/table";

import Pagination from "@/components/common/Pagination";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import { getPaginatedUsers } from "@/services/users";
import { IUser } from "@/types/users";

const { Title } = Typography;

const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Fetch users data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getPaginatedUsers(page, pageSize),
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleShowSizeChange = (_: number, size: number) => {
    setPageSize(size);
    setPage(1);
  };

  // Table columns definition
  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link href={`/users/${record.id}`}>
          <span className="text-blue-500 hover:underline flex items-center">
            <UserOutlined className="mr-2" />
            {text}
          </span>
        </Link>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (gender: string) => (
        <Tag
          color={
            gender === "male" ? "blue" : gender === "female" ? "pink" : "purple"
          }
        >
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Link href={`/users/${record.id}`}>
          <Button type="primary" icon={<EyeOutlined />} size="small">
            View
          </Button>
        </Link>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error message="Failed to load users" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <Title level={2} className="mb-4 md:mb-0">
            Users
          </Title>

          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            className="w-full md:w-64"
            allowClear
          />
        </div>

        {/* Wrapper agar tabel bisa di-scroll di mobile */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data?.data}
            rowKey="id"
            pagination={false}
            scroll={{ x: "100%" }}
            size="small"
          />
        </div>

        {data?.meta?.pagination && (
          <div className="mt-4">
            <Pagination
              current={page}
              total={data.meta.pagination.total}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={true}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default UsersPage;
