import React, { useEffect } from "react";
import { Form, Input, Button, Card, Select, Spin } from "antd";
import { useRouter } from "next/router";
import { Post, PostInput, User } from "@/types";
import { useUserList } from "@/hooks/useUsers";

const { TextArea } = Input;
const { Option } = Select;

interface PostFormProps {
  initialValues?: Partial<Post>;
  onSubmit: (values: PostInput) => void;
  isSubmitting?: boolean;
  title?: string;
  submitText: string;
  loading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  title,
  submitText,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { data: usersData, isLoading: isLoadingUsers } = useUserList({
    page: 1,
    per_page: 50,
  });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <Card title={title} className="shadow-md">
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
        requiredMark={false}
      >
        <Form.Item
          name="user_id"
          label="Author"
          rules={[{ required: true, message: "Please select an author" }]}
        >
          <Select
            placeholder="Select a user"
            loading={isLoadingUsers}
            showSearch
            optionFilterProp="children"
          >
            {usersData?.data?.length ? (
              usersData.data.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </Option>
              ))
            ) : (
              <Option disabled>Loading or No Users</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter a title" },
            { min: 5, message: "Title must be at least 5 characters" },
            { max: 200, message: "Title cannot exceed 200 characters" },
          ]}
        >
          <Input placeholder="Post title" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Content"
          rules={[
            { required: true, message: "Please enter content" },
            { min: 10, message: "Content must be at least 10 characters" },
          ]}
        >
          <TextArea
            placeholder="Write your post content here..."
            autoSize={{ minRows: 6, maxRows: 12 }}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {submitText}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostForm;
