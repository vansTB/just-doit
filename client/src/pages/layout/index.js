import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  DownOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createFromIconfontCN } from "@ant-design/icons";

import { Dropdown, Layout, Menu, message, Space } from "antd";
import { userStore } from "@/store/user";
const { Sider } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4815467_9fmf40kgjwj.js",
});

const items = [
  {
    label: "首页",
    key: "/home",
    icon: (
      <Space>
        <IconFont type="icon-zhuye" />
      </Space>
    ),
  },
  {
    label: "用户管理",
    icon: <IconFont type="icon-yonghu" />,
    key: "user-module",
    children: [
      {
        label: "用户列表",
        key: "/user",
      },
      {
        label: "角色列表",
        key: "/role",
      },
      {
        label: "菜单列表",
        key: "/menu",
      },
    ],
  },
  {
    label: "时刻管理",
    icon: <IconFont type="icon-dazuo" />,
    key: "moment-module",
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
  const { userInfo, removeUser } = userStore();
  const [collapsed, setCollapsed] = useState(false);
  const [currentRouteInfo, setCurrentRouteInfo] = useState({
    path: "",
    module: "",
  });
  const location = useLocation();

  const getRouteInfo = (path) => {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.children) {
        for (let j = 0; j < item.children.length; j++) {
          let jtem = item.children[j];
          console.log(jtem.key, "-----");

          if (jtem.key === path) {
            console.log("in");
            console.log("item.key", item.key);
            setCurrentRouteInfo({
              path,
              module: item.key,
            });
            return;
          }
        }
      }
    }
  };

  console.log("location", location);
  useEffect(() => {
    console.log("useEffect=======", location);

    setCurrentRouteInfo({ path: location.pathname });
    getRouteInfo(location.pathname);
  }, []);
  const handleMenuClick = ({ key }) => {
    // console.log("key", key);
    // setCurrentRoute(key);
    getRouteInfo(key);

    navigate(key);
  };

  const handleDrowDownClick = ({ key }) => {
    removeUser();
    navigate("/login");
    message.success("退出成功");
  };
  const userItems = [
    {
      key: "1",
      label: "logout",
      onClick: handleDrowDownClick,
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
          selectedKeys={[currentRouteInfo.path || ""]}
          defaultOpenKeys={[currentRouteInfo.module]}
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
            <a onClick={(e) => handleDrowDownClick()}>
              <Space>
                {userInfo?.username}
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
