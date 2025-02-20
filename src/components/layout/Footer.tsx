import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-50 text-center">
      <div className="container-custom">
        <p className="text-gray-600">
          MyBlog © {new Date().getFullYear()} - Built with Next.js, TanStack Query and Ant Design
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;