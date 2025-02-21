import React, { ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className="min-h-screen overflow-hidden">
      <Header />
      <Content className="container-custom py-6">{children}</Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout;
