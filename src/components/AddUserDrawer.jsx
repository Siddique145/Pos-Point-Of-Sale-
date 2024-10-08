
import { Drawer, Button, Form, Input, Select, message } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utilis/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const { Option } = Select;

function AddUserDrawer({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const docRef = doc(db, "users", user.user.uid);
      await setDoc(docRef, { ...values, uid: user.user.uid });
      setLoading(false);

      onClose();
      message.success("User account created successfully");
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer title="User Form" onClose={onClose} open={open}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="counteruser">Counter Local User</Option>
            {/* <Option value="viewer">Viewer</Option> */}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AddUserDrawer;
