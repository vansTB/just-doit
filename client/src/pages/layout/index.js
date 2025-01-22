import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Dropdown, Layout, Menu, message, Space } from "antd";
import { userStore } from "@/store/user";
const { Sider } = Layout;

const PageLayout = () => {
  const navigate = useNavigate();
  const { userInfo, removeUser, getUserMenus } = userStore();
  const [collapsed, setCollapsed] = useState(false);
  const [currentRouteInfo, setCurrentRouteInfo] = useState({
    path: "",
    module: "",
  });
  const [items, setItems] = useState([]);
  const location = useLocation();

  const getRouteInfo = (path) => {
    console.log("====getRouteInfo--path", path);
    console.log("====getRouteInfo--items", items);
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.children) {
        for (let j = 0; j < item.children.length; j++) {
          let jtem = item.children[j];
          console.log("-----", jtem);

          if (jtem.key === path) {
            setCurrentRouteInfo({
              path,
              module: jtem.parent_key + "",
            });
            return;
          }
        }
      } else {
        if (item.key === path) {
          setCurrentRouteInfo({
            path,
            module: "",
          });
          return;
        }
      }
    }
  };

  useEffect(() => {
    console.log("------------------location", location);

    setItems(getUserMenus().tree);
  }, []);

  useEffect(() => {
    console.log("------------------items-change", location);

    getRouteInfo(location.pathname);
  }, [items]);
  const handleMenuClick = ({ key }) => {
    console.log("key", key);
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
          openKeys={[currentRouteInfo.module]}
          onOpenChange={(keys) => {
            console.log("keys", keys);
            setCurrentRouteInfo({
              path: currentRouteInfo.path,
              module: keys[1] + "",
            });
          }}
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
            trigger="click"
            arrow={false}
          >
            <a onClick={(e) => e.preventDefault()}>
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
