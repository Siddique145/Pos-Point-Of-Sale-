// // import React, { useState, useEffect } from 'react';
// // import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
// // import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// // import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Use Firestore methods

// // const { Title } = Typography;

// // const AddGenericProfile = () => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(false); // Loading state

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       setLoading(true); // Start loading
// //       try {
// //         const snapshot = await getDocs(collection(db, 'genericProfiles'));
// //         const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setItems(itemList);
// //       } catch (error) {
// //         console.error('Error fetching items:', error);
// //       } finally {
// //         setLoading(false); // End loading
// //       }
// //     };

// //     fetchItems();
// //   }, []);

// //   const onFinish = async (values) => {
// //     setLoading(true); // Start loading
// //     try {
// //       await addDoc(collection(db, 'genericProfiles'), {
// //         name: values.name,
// //         description: values.description,
// //         createdAt: serverTimestamp(),
// //       });
// //       // Re-fetch items after adding a new one
// //       const snapshot = await getDocs(collection(db, 'genericProfiles'));
// //       const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setItems(itemList);
// //     } catch (error) {
// //       console.error('Error adding item:', error);
// //     } finally {
// //       setLoading(false); // End loading
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
// //       <Title level={3} style={{ textAlign: 'center' }}>
// //         Add New Generic Of the Item
// //       </Title>
// //       <Form name="add_generic_item" onFinish={onFinish} layout="vertical">
// //         <Form.Item
// //           label="Name"
// //           name="name"
// //           rules={[{ required: true, message: 'Please input the name!' }]}
// //         >
// //           <Input placeholder="Enter name" />
// //         </Form.Item>

// //         <Form.Item
// //           label="Description"
// //           name="description"
// //           rules={[{ required: true, message: 'Please provide a description!' }]}
// //         >
// //           <Input.TextArea rows={4} placeholder="Enter description" />
// //         </Form.Item>

// //         <Form.Item>
// //           <Button type="primary" htmlType="submit" block loading={loading}>
// //             {loading ? 'Adding...' : 'Add Item'}
// //           </Button>
// //         </Form.Item>
// //       </Form>

// //       <div style={{ height: '10%', overflowY: 'auto', marginTop: '20px' }}>
// //         <Title level={4}>Item List</Title>
// //         <Spin spinning={loading}>
// //           <List
// //             size="small"
// //             bordered
// //             dataSource={items}
// //             renderItem={item => (
// //               <List.Item>
// //                 <strong>{item.name}</strong>: {item.description}
// //               </List.Item>
// //             )}
// //           />
// //         </Spin>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default AddGenericProfile;


// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Use Firestore methods

// const { Title } = Typography;

// const AddGenericProfile = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [form] = Form.useForm(); // Create a form instance

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true); // Start loading
//       try {
//         const snapshot = await getDocs(collection(db, 'genericProfiles'));
//         const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setItems(itemList);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchItems();
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true); // Start loading
//     try {
//       await addDoc(collection(db, 'genericProfiles'), {
//         name: values.name,
//         description: values.description,
//         createdAt: serverTimestamp(),
//       });
//       // Reset form fields after adding a new one
//       form.resetFields();
//       // Re-fetch items after adding a new one
//       const snapshot = await getDocs(collection(db, 'genericProfiles'));
//       const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setItems(itemList);
//     } catch (error) {
//       console.error('Error adding item:', error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Add New Generic Item
//       </Title>
//       <Form form={form} name="add_generic_item" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the name!' }]}
//         >
//           <Input placeholder="Enter name" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter description" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             {loading ? 'Adding...' : 'Add Item'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ height: '10%', overflowY: 'auto', marginTop: '20px' }}>
//         <Title level={4}>Item List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={items}
//             renderItem={item => (
//               <List.Item>
//                 <strong>{item.name}</strong>: {item.description}
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddGenericProfile;



// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin, Popconfirm } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';

// const { Title } = Typography;

// const AddGenericProfile = () => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [editingItemId, setEditingItemId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'genericProfiles'), (snapshot) => {
//       const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setItems(itemList);
//       setFilteredItems(itemList); // Set initial filtered list
//     }, (error) => {
//       console.error('Error fetching items:', error);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const filtered = items.filter(item =>
//       item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   }, [searchTerm, items]);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       if (editingItemId) {
//         const itemRef = doc(db, 'genericProfiles', editingItemId);
//         await updateDoc(itemRef, {
//           name: values.name,
//           description: values.description,
//         });
//         setEditingItemId(null);
//       } else {
//         await addDoc(collection(db, 'genericProfiles'), {
//           name: values.name,
//           description: values.description,
//           createdAt: serverTimestamp(),
//         });
//       }
//       form.resetFields();
//     } catch (error) {
//       console.error('Error adding/updating item:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const editItem = (item) => {
//     setEditingItemId(item.id);
//     form.setFieldsValue({
//       name: item.name,
//       description: item.description,
//     });
//   };

//   const deleteItem = async (id) => {
//     setLoading(true);
//     try {
//       const itemRef = doc(db, 'genericProfiles', id);
//       await deleteDoc(itemRef);
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         {editingItemId ? 'Edit Generic Item' : 'Add New Generic Item'}
//       </Title>
//       <Form form={form} name="add_generic_item" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the name!' }]}
//         >
//           <Input placeholder="Enter name" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter description" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading} style={{ borderRadius: '5px' }}>
//             {loading ? 'Adding...' : editingItemId ? 'Update Item' : 'Add Item'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <Input
//         placeholder="Search by name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginTop: '20px', marginBottom: '10px' }}
//       />

//       <div style={{ marginTop: '20px' }}>
//         <Title level={4}>Item List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={filteredItems}
//             renderItem={item => (
//               <List.Item actions={[
//                 <Button icon={<EditOutlined />} onClick={() => editItem(item)} style={{ marginRight: '8px' }} />,
//                 <Popconfirm title="Are you sure to delete this item?" onConfirm={() => deleteItem(item.id)}>
//                   <Button icon={<DeleteOutlined />} type="danger" />
//                 </Popconfirm>
//               ]}>
//                 <strong>{item.name}</strong>: {item.description}
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddGenericProfile;































import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, List, Spin, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { db } from '../../utilis/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';

const { Title } = Typography;

const AddGenericProfile = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'genericProfiles'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemList);
      setFilteredItems(itemList);
    }, (error) => {
      console.error('Error fetching items:', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingItemId) {
        const itemRef = doc(db, 'genericProfiles', editingItemId);
        await updateDoc(itemRef, {
          name: values.name,
          description: values.description,
        });
        setEditingItemId(null);
      } else {
        await addDoc(collection(db, 'genericProfiles'), {
          name: values.name,
          description: values.description,
          createdAt: serverTimestamp(),
        });
      }
      form.resetFields();
    } catch (error) {
      console.error('Error adding/updating item:', error);
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditingItemId(item.id);
    form.setFieldsValue({
      name: item.name,
      description: item.description,
    });
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const itemRef = doc(db, 'genericProfiles', id);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting item:', error);
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
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        {editingItemId ? 'Edit Generic Item' : 'Add New Generic Item'}
      </Title>
      <Form form={form} name="add_generic_item" onFinish={onFinish} layout="vertical" style={{ flex: '1' }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please provide a description!' }]}
        >
          <Input.TextArea rows={1} placeholder="Enter description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading} style={{ borderRadius: '5px', backgroundColor: '#fca311', borderColor: '#fca311' }}>
            {loading ? 'Adding...' : editingItemId ? 'Update Item' : 'Add Item'}
          </Button>
        </Form.Item>
      </Form>

      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginTop: '0px', marginBottom: '0px' }}
      />

      <div style={{ flex: '1', overflowY: 'auto', marginTop: '20px', maxHeight: '300px' }}>
        <Title level={4}>Item List</Title>
        <Spin spinning={loading}>
          <List
            size="small"
            bordered
            dataSource={filteredItems}
            renderItem={item => (
              <List.Item actions={[
                <Button icon={<EditOutlined />} onClick={() => editItem(item)} style={{ marginRight: '8px' }} />,
                <Popconfirm title="Are you sure to delete this item?" onConfirm={() => deleteItem(item.id)}>
                  <Button icon={<DeleteOutlined />} type="danger" />
                </Popconfirm>
              ]}>
                <strong>{item.name}</strong>: {item.description}
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </Card>
  );
};

export default AddGenericProfile;
