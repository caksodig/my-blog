import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {
  size?: number;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 40,
  text = "Loading...",
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Spin indicator={antIcon} />
      {text && <p className="mt-4 text-gray-500">{text}</p>}
    </div>
  );
};

export default Loading;
