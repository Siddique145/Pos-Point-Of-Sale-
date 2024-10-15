
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
// import logo from '../../assets/logo.png'; // Replace with your logo path

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

// Define the menu items with children for hover functionality
const menuItems = [
  {
    key: "/admin/users",
    icon: <UserOutlined />,
    label: "Counter Users",
    children: [
      { key: "/admin/users", label: "View Users" },
    ],
  },
  {
    key: "/admin/masterprofile",
    icon: <UserOutlined />,
    label: "Master Profile",
    children: [
      { key: "/admin/additemprofile", label: "Add Item Profile" },
      { key: "/admin/addcompanyprofile", label: "Add Company Profile" },
      { key: "/admin/addgenericprofile", label: "Add Generic Profile" },
      { key: "/admin/addcategoryprofile", label: "Add Category Profile" },
      { key: "/admin/adddistributorprofile", label: "Add Distributor Profile" },
      { key: "/admin/editdistributorprofile", label: "Edit Distributor Profile" },
      { key: "/admin/editcompanyprofile", label: "Edit Company Profile" },
      { key: "/admin/edititemprofile", label: "Edit Item Profile" },
    ],
  },
  {
    key: "/admin/",
    icon: <LaptopOutlined />,
    label: "Transactions",
    children: [
      { key: "/admin/generateorder", label: "Generate Order" },
      { key: "/admin/addpurchaseprofile", label: "Purchase Invoice" },
      { key: "/admin/returnpurchaseprofile", label: "Purchase Return Invoice" },
      { key: "/admin/editpurchaseprofile", label: "Edit Purchase Invoice" },
      { key: "/admin/poscountersale", label: "Counter Sale" },
      { key: "/admin/posreturn", label: "Counter Return Sale" },
    ],
  },
  // {
  //   key: "/admin/inve",
  //   icon: <LaptopOutlined />,
  //   label: "Management",
  //   children: [
  //     { key: "/admin/dummy1", label: "Dummy 1" },
  //     { key: "/admin/dummy2", label: "Dummy 2" },
  //   ],
  // },
  {
    key: "/admin/acc",
    icon: <LaptopOutlined />,
    label: "Accounts",
    children: [
      { key: "/admin/purchaseofcash", label: "Add Cash Purchase Invoice" },
      { key: "/admin/purchaseofbank", label: "Add Cheque Purchase Invoice" },
    ],
  },
  {
    key: "/admin/reports",
    icon: <NotificationOutlined />,
    label: "Reports",
    children: [
      { key: "/admin/datewisesalereport", label: "Total Sales Reports" },
      { key: "/admin/paidinvoices", label: "Paid Invoices Reports" },
      { key: "/admin/expirydetector", label: "Expiry Detector" },
    ],
  },
];

const Dashboard = () => {
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

          // .logo {
          //   height: 32px;
          //   margin-right: 16px;
          // }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        `}
      </style>

      <Header>
        <div className="header-content">
          <img style={{height:"60px"}} src="https://img.icons8.com/?size=160&id=I2iJf1544eWE&format=png" alt="Logo" className="logo" />
          {/* <h1 style={{ color: "#fff", margin: 0 ,textAlign: "center" }} > Admin Dashboard</h1> */}
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
                <Text style={{ marginLeft: 8 }}>Admin Dashboard</Text>
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

        <Layout style={{ marginLeft: 0, overflow: "hidden" }}>
          <Content
            style={{
              margin: 0,
              minHeight: "75vh",
              background: token.colorBgContainer,
              padding: 24,
              borderRadius: token.borderRadiusLG,
              overflowY: "auto", // Allow inner scrolling
            }}
          >
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

export default Dashboard;
