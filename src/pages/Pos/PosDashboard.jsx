
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Typography, Dropdown, message, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utilis/firebase";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

// Define the menu items with children for hover functionality
const menuItems = [
  {
    key: "/counteruser/poscountersale",
    icon: <LaptopOutlined />,
    label: "Transactions",
    children: [
      { key: "/counteruser/poscountersale", label: "Counter Sale" },
      { key: "/counteruser/posreturn", label: "Counter Return Sale" },
    ],
  },
];

const PosDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      message.error("Failed to log out");
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleRefresh = () => {
    message.success("Data refreshed!");
    // Implement your data fetching logic here
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <style>
        {`
          .sidebar {
            background: #001529;
            overflow: hidden; /* Ensure no scrollbar on sidebar */
          }

          .menu .ant-menu-item {
            color: #fff;
          }

          .menu .ant-menu-item:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .menu .ant-menu-item-selected {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .menu .ant-menu-submenu {
            background: #001529;
          }

          .menu .ant-menu-submenu-title {
            color: #fff;
          }

          .menu .ant-menu-submenu-title:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fca311;
          }

          .user-button {
            margin-left: 16px;
          }

          .user-button .ant-avatar {
            background: #fca311;
          }

          .user-button .ant-typography {
            color: #fff;
          }

          .ant-layout-footer {
            background: #001529;
            color: #fff;
          }

          .refresh-button {
            margin-right: 16px;
            color: #fca311;
          }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
          }

          .content {
            padding: 24px;
            background: ${token.colorBgContainer};
            border-radius: ${token.borderRadiusLG};
            overflow-y: auto; /* Allow inner scrolling */
            height: calc(100vh - 64px - 50px); /* Adjust height to avoid footer and header */
          }

          @media (max-width: 768px) {
            .sidebar {
              width: 200px; /* Adjust for smaller screens */
            }
          }
        `}
      </style>

      <Header>
        <div className="header-content">
          <img
            style={{ height: "60px" }}
            src="https://img.icons8.com/?size=160&id=I2iJf1544eWE&format=png"
            alt="Logo"
            className="logo"
          />
          <div>
            <Button
              type="text"
              className="refresh-button"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              title="Refresh Data"
            />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button type="text" className="user-button">
                <Avatar icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8 }}>Counter User</Text>
              </Button>
            </Dropdown>
          </div>
        </div>
      </Header>

      <Layout>
        <Sider width={240} className="sidebar">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={(e) => navigate(e.key)}
            className="menu"
          >
            {menuItems.map((item) => (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: 0 }}>
          <Content className="content">
            <Outlet />
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Point Of Sale ©{new Date().getFullYear()} Created by Muhammad Siddique
          </Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PosDashboard;
