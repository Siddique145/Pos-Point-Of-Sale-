// // import React, { useState, useEffect } from 'react';
// // import { Form, Input, Button, Card, Typography, List } from 'antd';
// // import { db } from '../../utilis/firebase'; // Adjust the import based on your firebase config file
// // import firebase from 'firebase/app';

// // const { Title } = Typography;

// // const AddCategoryProfile = () => {
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     // Fetch categories from Firebase
// //     const fetchCategories = async () => {
// //       const snapshot = await db.collection('categories').get();
// //       const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setCategories(categoriesList);
// //     };

// //     fetchCategories();
// //   }, []);

// //   const onFinish = async (values) => {
// //     try {
// //       await db.collection('categories').add({
// //         categoryName: values.categoryName,
// //         description: values.description,
// //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
// //       });
// //       // Re-fetch categories after adding a new one
// //       const snapshot = await db.collection('categories').get();
// //       const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setCategories(categoriesList);
// //     } catch (error) {
// //       console.error('Error adding category:', error);
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
// //       <Title level={3} style={{ textAlign: 'center' }}>
// //         Add New Category
// //       </Title>
// //       <Form name="add_category" onFinish={onFinish} layout="vertical">
// //         <Form.Item
// //           label="Category Name"
// //           name="categoryName"
// //           rules={[{ required: true, message: 'Please input the category name!' }]}
// //         >
// //           <Input placeholder="Enter category name" />
// //         </Form.Item>

// //         <Form.Item
// //           label="Description"
// //           name="description"
// //           rules={[{ required: true, message: 'Please provide a description!' }]}
// //         >
// //           <Input.TextArea rows={4} placeholder="Enter category description" />
// //         </Form.Item>

// //         <Form.Item>
// //           <Button type="primary" htmlType="submit" block>
// //             Add Category
// //           </Button>
// //         </Form.Item>
// //       </Form>

// //       <div style={{ height: '10%', overflowY: 'auto', marginTop: '20px' }}>
// //         <Title level={4}>Category List</Title>
// //         <List
// //           size="small"
// //           bordered
// //           dataSource={categories}
// //           renderItem={item => (
// //             <List.Item>
// //               <strong>{item.categoryName}</strong>: {item.description}
// //             </List.Item>
// //           )}
// //         />
// //       </div>
// //     </Card>
// //   );
// // };

// // export default AddCategoryProfile;





// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust this path as needed
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore methods

// const { Title } = Typography;

// const AddCategoryProfile = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true); // Start loading
//       try {
//         const snapshot = await getDocs(collection(db, 'categories'));
//         const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setCategories(categoriesList);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchCategories();
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true); // Start loading
//     try {
//       await addDoc(collection(db, 'categories'), {
//         categoryName: values.categoryName,
//         description: values.description,
//         createdAt: serverTimestamp(),
//       });
//       // Re-fetch categories after adding a new one
//       const snapshot = await getDocs(collection(db, 'categories'));
//       const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setCategories(categoriesList);
//     } catch (error) {
//       console.error('Error adding category:', error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Add New Category
//       </Title>
//       <Form name="add_category" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Category Name"
//           name="categoryName"
//           rules={[{ required: true, message: 'Please input the category name!' }]}
//         >
//           <Input placeholder="Enter category name" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter category description" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             {loading ? 'Adding...' : 'Add Category'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ height: '10%', overflowY: 'auto', marginTop: '20px' }}>
//         <Title level={4}>Category List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={categories}
//             renderItem={item => (
//               <List.Item>
//                 <strong>{item.categoryName}</strong>: {item.description}
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddCategoryProfile;


// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin, Popconfirm } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import icons
// import { db } from '../../utilis/firebase'; // Adjust this path as needed
// import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore'; // Import Firestore methods

// const { Title } = Typography;

// const AddCategoryProfile = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [editingCategoryId, setEditingCategoryId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
//       const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setCategories(categoriesList);
//     }, (error) => {
//       console.error('Error fetching categories:', error);
//     });

//     // Cleanup the listener on component unmount
//     return () => unsubscribe();
//   }, []);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       if (editingCategoryId) {
//         // Update existing category
//         const categoryRef = doc(db, 'categories', editingCategoryId);
//         await updateDoc(categoryRef, {
//           categoryName: values.categoryName,
//           description: values.description,
//         });
//         setEditingCategoryId(null); // Clear editing state
//       } else {
//         // Add new category
//         await addDoc(collection(db, 'categories'), {
//           categoryName: values.categoryName,
//           description: values.description,
//           createdAt: serverTimestamp(),
//         });
//       }
//       form.resetFields(); // Reset the form fields
//     } catch (error) {
//       console.error('Error adding/updating category:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const editCategory = (category) => {
//     setEditingCategoryId(category.id);
//     form.setFieldsValue({
//       categoryName: category.categoryName,
//       description: category.description,
//     });
//   };

//   const deleteCategory = async (id) => {
//     setLoading(true);
//     try {
//       const categoryRef = doc(db, 'categories', id);
//       await deleteDoc(categoryRef);
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         {editingCategoryId ? 'Edit Category' : 'Add New Category'}
//       </Title>
//       <Form form={form} name="add_category" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Category Name"
//           name="categoryName"
//           rules={[{ required: true, message: 'Please input the category name!' }]}
//         >
//           <Input placeholder="Enter category name" />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter category description" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading}>
//             {loading ? 'Saving...' : editingCategoryId ? 'Update Category' : 'Add Category'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ marginTop: '20px' }}>
//         <Title level={4}>Category List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={categories}
//             renderItem={item => (
//               <List.Item actions={[
//                 <Button icon={<EditOutlined />} onClick={() => editCategory(item)} />,
//                 <Popconfirm title="Are you sure to delete this category?" onConfirm={() => deleteCategory(item.id)}>
//                   <Button icon={<DeleteOutlined />} type="danger" />
//                 </Popconfirm>
//               ]}>
//                 <strong>{item.categoryName}</strong>: {item.description}
//               </List.Item>
//             )}
//           />
//         </Spin>
//       </div>
//     </Card>
//   );
// };

// export default AddCategoryProfile;


















import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, List, Spin, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { db } from '../../utilis/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';

const { Title } = Typography;

const AddCategoryProfile = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesList);
    }, (error) => {
      console.error('Error fetching categories:', error);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingCategoryId) {
        const categoryRef = doc(db, 'categories', editingCategoryId);
        await updateDoc(categoryRef, {
          categoryName: values.categoryName,
          description: values.description,
        });
        setEditingCategoryId(null); // Clear editing state
      } else {
        await addDoc(collection(db, 'categories'), {
          categoryName: values.categoryName,
          description: values.description,
          createdAt: serverTimestamp(),
        });
      }
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error('Error adding/updating category:', error);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = (category) => {
    setEditingCategoryId(category.id);
    form.setFieldsValue({
      categoryName: category.categoryName,
      description: category.description,
    });
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const categoryRef = doc(db, 'categories', id);
      await deleteDoc(categoryRef);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 500,
        margin: 'auto',
        marginTop : "0",
        padding: '0px',
        borderRadius: '0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden', // Hide overflow
      }}
    >
      <Title level={3} style={{ textAlign: 'center' }}>
        {editingCategoryId ? 'Edit Category' : 'Add New Category'}
      </Title>
      <Form form={form} name="add_category" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please provide a description!' }]}
        >
          <Input.TextArea rows={1} placeholder="Enter category description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ backgroundColor: '#fca311', borderColor: '#fca311' }} // Theme color
          >
            {loading ? 'Saving...' : editingCategoryId ? 'Update Category' : 'Add Category'}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: '0px', maxHeight: '120px', overflowY: 'auto' }}> {/* Inner scroll */}
        <Title level={4}>Category List</Title>
        <Spin spinning={loading}>
          <List
            size="small"
            bordered
            dataSource={categories}
            renderItem={item => (
              <List.Item actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => editCategory(item)}
                  style={{ color: '#fca311' }} // Theme color for edit button
                />,
                <Popconfirm title="Are you sure to delete this category?" onConfirm={() => deleteCategory(item.id)}>
                  <Button icon={<DeleteOutlined />} type="danger" />
                </Popconfirm>
              ]}>
                <strong>{item.categoryName}</strong>: {item.description}
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </Card>
  );
};

export default AddCategoryProfile;
