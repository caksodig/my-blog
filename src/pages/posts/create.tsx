import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Select, Input, Button, message } from "antd";
import { getAllUsers } from "@/services/users";
import { createPost } from "@/services/posts";

const { Option } = Select;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch users from API
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  // Mutation untuk create post
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      message.success("Post created successfully!");
      setTitle("");
      setBody("");
      setUserId("");
    },
    onError: () => {
      message.error("Failed to create post.");
    },
  });

  const handleCreatePost = () => {
    if (!userId) {
      message.warning("Please select an author!");
      return;
    }

    mutation.mutate({
      user_id: parseInt(userId, 10),
      title,
      body,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

      <Select
        value={userId}
        onChange={setUserId}
        placeholder="Select an author"
        className="w-full mb-2"
        loading={isLoading}
      >
        {users?.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </Option>
        ))}
      </Select>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-2"
      />

      <Input.TextArea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        rows={4}
        className="w-full mb-2"
      />

      {/* Submit Button */}
      <Button
        type="primary"
        onClick={handleCreatePost}
        loading={mutation.isPending}
        className="w-full"
      >
        Create Post
      </Button>
    </div>
  );
};

export default CreatePost;
