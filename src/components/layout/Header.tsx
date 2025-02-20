import React, { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/users", label: "Users" },
    { key: "/posts/create", label: "Create Post" },
  ];

  const handleMenuClick = (key: string) => {
    if (router.pathname !== key) {
      router.push(key);
    }
    setMobileMenuOpen(false);
  };

  const activeKey =
    menuItems.find(
      (item) =>
        router.pathname === item.key ||
        (item.key !== "/" && router.pathname.startsWith(item.key))
    )?.key || "/";

  return (
    <AntHeader className="bg-white shadow-sm py-0 px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 mr-8">
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            className="border-0"
            items={menuItems.map((item) => ({
              key: item.key,
              label: (
                <span onClick={() => handleMenuClick(item.key)}>
                  {item.label}
                </span>
              ),
            }))}
          />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          size="large"
        />
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            label: (
              <span onClick={() => handleMenuClick(item.key)}>
                {item.label}
              </span>
            ),
          }))}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header;
