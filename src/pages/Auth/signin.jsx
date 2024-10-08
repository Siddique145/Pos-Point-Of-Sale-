// // import React from "react";
// // import { Button, Checkbox, Form, Input } from "antd";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../../utilis/firebase";

// // const SignIn = () => {
  
// //   const onFinish = (values) => {
// //     signInWithEmailAndPassword(auth, values.email, values.password).then(() =>
// //       console.log("Login hogya")
// //     );
// //   };
// //   const onFinishFailed = (errorInfo) => {
// //     console.log("Failed:", errorInfo);
// //   };
// //   return (
// //     <div className="h-screen w-screen flex justify-center items-center">
// //       <Form
// //         name="basic"
// //         labelCol={{
// //           span: 8,
// //         }}
// //         wrapperCol={{
// //           span: 16,
// //         }}
// //         style={{
// //           maxWidth: 800,
// //         }}
// //         initialValues={{
// //           remember: true,
// //         }}
// //         onFinish={onFinish}
// //         onFinishFailed={onFinishFailed}
// //         autoComplete="off"
// //       >
// //         <Form.Item
// //           label="Username"
// //           name="email"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please input your email!",
// //             },
// //           ]}
// //         >
// //           <Input />
// //         </Form.Item>

// //         <Form.Item
// //           label="Password"
// //           name="password"
// //           rules={[
// //             {
// //               required: true,
// //               message: "Please input your password!",
// //             },
// //           ]}
// //         >
// //           <Input.Password />
// //         </Form.Item>

// //         <Form.Item
// //           wrapperCol={{
// //             offset: 8,
// //             span: 16,
// //           }}
// //         >
// //           <Button type="primary" htmlType="submit">
// //             Submit
// //           </Button>
// //         </Form.Item>
// //       </Form>
// //     </div>
// //   );
// // };
// // export default SignIn;











// import React, { useContext } from "react";
// import { Button, Form, Input } from "antd";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utilis/firebase";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../../context/Auth";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const onFinish = async (values) => {
//     try {
//       await signInWithEmailAndPassword(auth, values.email, values.password);
//       console.log("Login successful");

//       // After successful login, redirect based on role
//       if (user?.role === "admin") {
//         navigate("/admin/users");
//       } else {
//         navigate("/pos");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center">
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 800,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default SignIn;





// import React, { useContext, useEffect } from "react";
// import { Button, Form, Input } from "antd";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utilis/firebase";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../../context/Auth";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const onFinish = async (values) => {
//     try {
//       await signInWithEmailAndPassword(auth, values.email, values.password);
//       console.log("Login successful");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   // Effect to handle navigation based on user role
//   useEffect(() => {
//     if (user.isLogin) {
//       if (user.role === "admin") {
//         navigate("/admin/users");
//       } if (user.role === "counteruser") {
//         navigate("/counteruser");
//       }
//        else {
//         navigate("/");
//       }
//     }
//   }, [user, navigate]); // Add user and navigate to dependencies

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center">
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 800,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default SignIn;









// import React, { useContext, useEffect, useState } from "react";
// import { Button, Form, Input, message } from "antd";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utilis/firebase";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../../context/Auth";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, values.email, values.password);
//       console.log("Login successful");
//       message.success("Login successful!");
//     } catch (error) {
//       console.error("Login failed:", error);
//       message.error("Login failed: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user.isLogin) {
//       if (user.role === "admin") {
//         navigate("/admin/users");
//       } else if (user.role === "counteruser") {
//         navigate("/counteruser");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [user, navigate]);

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="sign-in-container">
//       <style>
//         {`
//           .sign-in-container {
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             position: relative;
//             background-color: #080710;
//           }

//           .background {
//             width: 100%;
//             height: 100%;
//             position: absolute;
//             overflow: hidden;
//           }

//           .shape {
//             height: 30vw;
//             width: 30vw;
//             position: absolute;
//             border-radius: 50%;
//           }

//           .shape:first-child {
//             background: linear-gradient(#1845ad, #23a2f6);
//             left: -15vw;
//             top: -15vw;
//           }

//           .shape:last-child {
//             background: linear-gradient(to right, #ff512f, #f09819);
//             right: -10vw;
//             bottom: -15vw;
//           }

//           .login-form {
//             max-width: 400px;
//             width: 90%;
//             background-color: rgba(255, 255, 255, 0.15);
//             position: relative;
//             border-radius: 10px;
//             backdrop-filter: blur(10px);
//             border: 2px solid rgba(255, 255, 255, 0.1);
//             box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
//             padding: 50px 35px;
//             z-index: 1;
//             color: #fff;
//           }

//           .login-form h3 {
//             font-size: 2rem;
//             font-weight: 500;
//             line-height: 42px;
//             text-align: center;
//             color: #ffffff;
//           }

//           .ant-form-item-label > label {
//             color: white; /* Change label color to white */
//             font-weight: bold; /* Make label bold */
//           }

//           .ant-input {
//             color: orange; /* Input text color */
//             border-color: orange; /* Input border color */
//           }

//           .ant-input:focus {
//             border-color: orange;
//             box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
//           }

//           .ant-input-password {
//             color: orange; /* Password input text color */
//             border-color: orange; /* Password input border color */
//           }

//           .ant-input-password:focus {
//             border-color: orange;
//             box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
//           }

//           .social {
//             margin-top: 30px;
//             display: flex;
//             justify-content: center;
//           }

//           .social div {
//             background-color: rgba(255, 255, 255, 0.27);
//             color: #eaf0fb;
//             text-align: center;
//             border-radius: 3px;
//             padding: 5px 10px;
//             margin: 0 10px;
//             cursor: pointer;
//           }

//           .social div:hover {
//             background-color: rgba(255, 255, 255, 0.47);
//           }

//           .social i {
//             margin-right: 4px;
//           }

//           @media (max-width: 768px) {
//             .shape {
//               height: 40vw;
//               width: 40vw;
//             }

//             .login-form {
//               padding: 30px 20px;
//             }

//             .login-form h3 {
//               font-size: 1.5rem;
//             }
//           }

//           @media (max-width: 480px) {
//             .shape {
//               height: 50vw;
//               width: 50vw;
//             }

//             .login-form {
//               max-width: 90%;
//             }

//             .login-form h3 {
//               font-size: 1.25rem;
//             }
//           }
//         `}
//       </style>

//       <div className="background">
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>
//       <Form
//         name="basic"
//         className="login-form"
//         labelCol={{ span: 24 }}
//         wrapperCol={{ span: 24 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <h3>POS Login</h3>
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[{ required: true, message: "Please input your email!" }]}
//         >
//           <Input placeholder="Email" />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password placeholder="Password" className="ant-input-password" />
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
//           <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
//             Log In
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default SignIn;



















import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utilis/firebase";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/Auth";

const SignIn = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Login successful");
      message.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isLogin) {
      if (user.role === "admin") {
        navigate("/admin/users");
      } else if (user.role === "counteruser") {
        navigate("/counteruser");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success("Copied to clipboard!");
    }).catch(err => {
      message.error("Failed to copy: " + err);
    });
  };

  return (
    <div className="sign-in-container">
      <style>
        {`
          .sign-in-container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background-color: #080710;
          }

          .background {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
          }

          .shape {
            height: 30vw;
            width: 30vw;
            position: absolute;
            border-radius: 50%;
          }

          .shape:first-child {
            background: linear-gradient(#1845ad, #23a2f6);
            left: -15vw;
            top: -15vw;
          }

          .shape:last-child {
            background: linear-gradient(to right, #ff512f, #f09819);
            right: -10vw;
            bottom: -15vw;
          }

          .login-form {
            max-width: 400px;
            width: 90%;
            background-color: rgba(255, 255, 255, 0.15);
            position: relative;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
            padding: 50px 35px;
            z-index: 1;
            color: #fff;
          }

          .login-form h3 {
            font-size: 2rem;
            font-weight: 500;
            line-height: 42px;
            text-align: center;
            color: #ffffff;
          }

          .ant-form-item-label > label {
            color: white;
            font-weight: bold;
          }

          .ant-input {
            color: orange;
            border-color: orange;
          }

          .ant-input:focus {
            border-color: orange;
            box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
          }

          .ant-input-password {
            color: orange;
            border-color: orange;
          }

          .ant-input-password:focus {
            border-color: orange;
            box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
          }

          .info-div {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          }

          .info-div h4 {
            margin-bottom: 10px;
          }

          .copy-icon {
            cursor: pointer;
            margin-left: 5px;
            color: orange;
          }

          .social {
            margin-top: 30px;
            display: flex;
            justify-content: center;
          }

          .social div {
            background-color: rgba(255, 255, 255, 0.27);
            color: #eaf0fb;
            text-align: center;
            border-radius: 3px;
            padding: 5px 10px;
            margin: 0 10px;
            cursor: pointer;
          }

          .social div:hover {
            background-color: rgba(255, 255, 255, 0.47);
          }

          .social i {
            margin-right: 4px;
          }

          @media (max-width: 768px) {
            .shape {
              height: 40vw;
              width: 40vw;
            }

            .login-form {
              padding: 30px 20px;
            }

            .login-form h3 {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 480px) {
            .shape {
              height: 50vw;
              width: 50vw;
            }

            .login-form {
              max-width: 90%;
            }

            .login-form h3 {
              font-size: 1.25rem;
            }
          }
        `}
      </style>

      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="info-div">
        <h4>Admin Credentials</h4>
        <p>Email: owner@pos.com <span className="copy-icon" onClick={() => copyToClipboard("owner@pos.com")}>📋</span></p>
        <p>Password: 123456789 <span className="copy-icon" onClick={() => copyToClipboard("123456789")}>📋</span></p>
        <h4>Local User Credentials</h4>
        <p>Email: test@pos.com <span className="copy-icon" onClick={() => copyToClipboard("test@pos.com")}>📋</span></p>
        <p>Password: test123 <span className="copy-icon" onClick={() => copyToClipboard("test123")}>📋</span></p>
      </div>

      <Form
        name="basic"
        className="login-form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3>POS Login</h3>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
