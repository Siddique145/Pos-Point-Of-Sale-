





import { Table, Spin, Typography } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utilis/firebase";

const { Title } = Typography;

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true

  useEffect(() => {
    getUsersFromDB();
  }, []);

  const getUsersFromDB = async () => {
    const ref = collection(db, "users");
    const userData = await getDocs(ref);
    if (!userData.empty) {
      const allUsers = [];
      userData.forEach((userInfo) => {
        allUsers.push({ ...userInfo.data(), id: userInfo.id });
      });
      setUsers(allUsers);
    }
    setLoading(false); // Set loading to false after fetching data
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Uid",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', margin: '16px 0' }}>
      <Title level={3} style={{ marginBottom: 16 }}>User List</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }} // Adjust pagination as needed
          scroll={{ x: 'max-content' }} // Responsive horizontal scrolling
        />
      )}
    </div>
  );
}

export default UsersList;
