"use client";
import React from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

interface ErrorProps {
  message: string;
  title?: string;
  subTitle?: string;
  status?: "403" | "404" | "500" | "error" | "info" | "success" | "warning";
  backPath?: string;
}

const Error: React.FC<ErrorProps> = ({
  title = "Something went wrong",
  subTitle = "Sorry, there was an error. Please try again.",
  status = "error",
  backPath = "/",
}) => {
  const router = useRouter();

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => router.push(backPath)}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
