// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Use Firestore modular methods

// const { Title } = Typography;

// const AddCompanyProfile = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [form] = Form.useForm(); // Create a form instance

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true); // Start loading
//       try {
//         const snapshot = await getDocs(collection(db, 'companies'));
//         const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setCompanies(companyList);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true); // Start loading
//     try {
//       await addDoc(collection(db, 'companies'), {
//         name: values.name,
//         address: values.address,
//         website: values.website,
//         description: values.description,
//         createdAt: serverTimestamp(),
//       });
//       // Reset the form fields after successful submission
//       form.resetFields();
//       // Re-fetch companies after adding a new one
//       const snapshot = await getDocs(collection(db, 'companies'));
//       const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setCompanies(companyList);
//     } catch (error) {
//       console.error('Error adding company:', error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Add Company Profile
//       </Title>
//       <Form form={form} name="add_company" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Company Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the company name!' }]}
//         >
//           <Input placeholder="Enter company name" />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: 'Please input the address!' }]}
//         >
//           <Input placeholder="Enter address" />
//         </Form.Item>

//         <Form.Item
//           label="Website"
//           name="website"
//           rules={[{ required: true, message: 'Please input the website!' }, { type: 'url', message: 'Please enter a valid URL!' }]}
//         >
//           <Input placeholder="Enter website URL" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter company description" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             {loading ? 'Adding...' : 'Add Company'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ height: '20%', overflowY: 'auto', marginTop: '20px' }}>
//         <Title level={4}>Company List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={companies}
//             renderItem={item => (
//               <List.Item key={item.id}>
//                 <strong>{item.name}</strong> - {item.address}
//                 <div>
//                   <a href={item.website} target="_blank" rel="noopener noreferrer">
//                     {item.website}
//                   </a>
//                 </div>
//                 <p>{item.description}</p>
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddCompanyProfile;




























import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Use Firestore modular methods

const { Title } = Typography;

const AddCompanyProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true); // Start loading
      try {
        const snapshot = await getDocs(collection(db, 'companies'));
        const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCompanies();
  }, []);

  const onFinish = async (values) => {
    setLoading(true); // Start loading
    try {
      await addDoc(collection(db, 'companies'), {
        name: values.name,
        address: values.address,
        website: values.website,
        description: values.description,
        createdAt: serverTimestamp(),
      });
      // Reset the form fields after successful submission
      form.resetFields();
      // Re-fetch companies after adding a new one
      const snapshot = await getDocs(collection(db, 'companies'));
      const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList);
    } catch (error) {
      console.error('Error adding company:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: '0px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: '0vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Add Company Profile
      </Title>

      {/* Form Section */}
      <Form form={form} name="add_company" onFinish={onFinish} layout="vertical" style={{ flex: '1' }}>
        <Form.Item
          label="Company Name"
          name="name"
          rules={[{ required: true, message: 'Please input the company name!' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            { required: true, message: 'Please input the website!' },
            { type: 'url', message: 'Please enter a valid URL!' },
          ]}
        >
          <Input placeholder="Enter website URL" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please provide a description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter company description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ backgroundColor: '#fca311', borderColor: '#fca311' }} // Theme color
          >
            {loading ? 'Adding...' : 'Add Company'}
          </Button>
        </Form.Item>
      </Form>

      {/* Company List Section */}
      <div style={{ flex: '1', overflowY: 'auto', marginTop: '20px', maxHeight: '300px' }}>
        <Title level={4}>Company List</Title>
        <Spin spinning={loading}>
          <List
            size="small"
            bordered
            dataSource={companies}
            renderItem={item => (
              <List.Item key={item.id}>
                <strong>{item.name}</strong> - {item.address}
                <div>
                  <a href={item.website} target="_blank" rel="noopener noreferrer">
                    {item.website}
                  </a>
                </div>
                <p>{item.description}</p>
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </Card>
  );
};

export default AddCompanyProfile;
