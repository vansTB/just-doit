import React, { useState } from "react";
import {
  DesktopOutlined,
  DownOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useNavigate } from "react-router-dom";

import { Dropdown, Layout, Menu, Space } from "antd";
import { userStore } from "@/store/user";
const { Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/home",
    icon: <DesktopOutlined />,
  },
  {
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        label: "用户列表",
        key: "/user",
      },
    ],
  },
  {
    label: "时刻管理",
    icon: <PieChartOutlined />,
    children: [
      {
        label: "主题",
        key: "/theme",
      },
      {
        label: "记录",
        key: "/record",
      },
    ],
  },
];

const PageLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = userStore();
  const [collapsed, setCollapsed] = useState(false);
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  const userItems = [
    {
      key: "1",
      label: "logout",
    },
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/home"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <div className="right-container">
        <div className="right-header">
          <Dropdown
            menu={{
              items: userItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userInfo.username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="router-container">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};
export default PageLayout;
