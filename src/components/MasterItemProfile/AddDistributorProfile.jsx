// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

// const { Title } = Typography;

// const AddDistributorProfile = () => {
//   const [distributors, setDistributors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchDistributors = async () => {
//       setLoading(true);
//       try {
//         const snapshot = await getDocs(collection(db, 'distributors'));
//         const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setDistributors(distributorList);
//       } catch (error) {
//         console.error('Error fetching distributors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDistributors();
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       await addDoc(collection(db, 'distributors'), {
//         name: values.name,
//         address: values.address,
//         phone: values.phone,
//         email: values.email,
//         createdAt: serverTimestamp(),
//       });
//       form.resetFields();

//       // Re-fetch distributors after adding a new one
//       const snapshot = await getDocs(collection(db, 'distributors'));
//       const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setDistributors(distributorList);
//     } catch (error) {
//       console.error('Error adding distributor:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Add Distributor
//       </Title>
//       <Form form={form} name="add_distributor" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Distributor Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the distributor name!' }]}
//         >
//           <Input placeholder="Enter distributor name" />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: 'Please input the address!' }]}
//         >
//           <Input placeholder="Enter address" />
//         </Form.Item>

//         <Form.Item
//           label="Phone Number"
//           name="phone"
//           rules={[
//             { required: true, message: 'Please input the phone number!' },
//             { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' }
//           ]}
//         >
//           <Input placeholder="Enter phone number" />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: true, message: 'Please input the email!' },
//             { type: 'email', message: 'Please enter a valid email!' }
//           ]}
//         >
//           <Input placeholder="Enter email address" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             {loading ? 'Adding...' : 'Add Distributor'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ height: '20%', overflowY: 'auto', marginTop: '20px' }}>
//         <Title level={4}>Distributor List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={distributors}
//             renderItem={item => (
//               <List.Item key={item.id}>
//                 <strong>{item.name}</strong> - {item.address}
//                 <div>
//                   Phone: {item.phone} | Email: {item.email}
//                 </div>
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddDistributorProfile;


























import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
import { db } from '../../utilis/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const { Title } = Typography;

const AddDistributorProfile = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'distributors'));
        const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDistributors(distributorList);
      } catch (error) {
        console.error('Error fetching distributors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'distributors'), {
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: values.email,
        createdAt: serverTimestamp(),
      });
      form.resetFields();

      // Re-fetch distributors after adding a new one
      const snapshot = await getDocs(collection(db, 'distributors'));
      const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDistributors(distributorList);
    } catch (error) {
      console.error('Error adding distributor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: '0px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        height: '0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title level={3} style={{ textAlign: 'center', marginBottom: '0px' }}>
        Add Distributor
      </Title>
      <Form form={form} name="add_distributor" onFinish={onFinish} layout="vertical" style={{ flex: '1' }}>
        <Form.Item
          label="Distributor Name"
          name="name"
          rules={[{ required: true, message: 'Please input the distributor name!' }]}
        >
          <Input placeholder="Enter distributor name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Please input the phone number!' },
            { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' }
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading} style={{ borderRadius: '5px', backgroundColor: '#fca311', borderColor: '#fca311' }}>
            {loading ? 'Adding...' : 'Add Distributor'}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ flex: '1', overflowY: 'auto', marginTop: '0px', maxHeight: '300px' }}>
        <Title level={4}>Distributor List</Title>
        <Spin spinning={loading}>
          <List
            size="small"
            bordered
            dataSource={distributors}
            renderItem={item => (
              <List.Item key={item.id}>
                <strong>{item.name}</strong> - {item.address}
                <div>
                  Phone: {item.phone} | Email: {item.email}
                </div>
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </Card>
  );
};

export default AddDistributorProfile;
