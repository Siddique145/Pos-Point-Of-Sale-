// // import React, { useState, useEffect } from 'react';
// // import { Form, Input, Button, Card, Typography, List, Spin, message } from 'antd';
// // import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// // import { collection, getDocs, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';

// // const { Title } = Typography;

// // const EditDistributorProfile = () => {
// //   const [distributors, setDistributors] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [form] = Form.useForm();
// //   const [selectedDistributor, setSelectedDistributor] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     const fetchDistributors = async () => {
// //       setLoading(true);
// //       try {
// //         const snapshot = await getDocs(collection(db, 'distributors'));
// //         const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setDistributors(distributorList);
// //       } catch (error) {
// //         console.error('Error fetching distributors:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDistributors();
// //   }, []);

// //   const onSearch = () => {
// //     const distributor = distributors.find(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //     if (distributor) {
// //       setSelectedDistributor(distributor);
// //       form.setFieldsValue(distributor);
// //     } else {
// //       message.error('Distributor not found');
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //     }
// //   };

// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       const distributorRef = doc(db, 'distributors', selectedDistributor.id);
// //       await updateDoc(distributorRef, {
// //         name: values.name,
// //         address: values.address,
// //         phone: values.phone,
// //         email: values.email,
// //         updatedAt: serverTimestamp(),
// //       });
// //       message.success('Distributor updated successfully');
// //       // Clear the selected distributor and reset form
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //       // Re-fetch distributors to get updated data
// //       const snapshot = await getDocs(collection(db, 'distributors'));
// //       const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setDistributors(distributorList);
// //     } catch (error) {
// //       console.error('Error updating distributor:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
// //       <Title level={3} style={{ textAlign: 'center' }}>
// //         Edit Distributor
// //       </Title>
// //       <Input.Search
// //         placeholder="Search Distributor by Name"
// //         value={searchQuery}
// //         onChange={e => setSearchQuery(e.target.value)}
// //         onSearch={onSearch}
// //         enterButton
// //         style={{ marginBottom: '20px' }}
// //       />
// //       <Form form={form} name="edit_distributor" onFinish={onFinish} layout="vertical">
// //         <Form.Item
// //           label="Distributor Name"
// //           name="name"
// //           rules={[{ required: true, message: 'Please input the distributor name!' }]}
// //         >
// //           <Input placeholder="Enter distributor name" disabled={!selectedDistributor} />
// //         </Form.Item>

// //         <Form.Item
// //           label="Address"
// //           name="address"
// //           rules={[{ required: true, message: 'Please input the address!' }]}
// //         >
// //           <Input placeholder="Enter address" disabled={!selectedDistributor} />
// //         </Form.Item>

// //         <Form.Item
// //           label="Phone Number"
// //           name="phone"
// //           rules={[
// //             { required: true, message: 'Please input the phone number!' },
// //             { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' }
// //           ]}
// //         >
// //           <Input placeholder="Enter phone number" disabled={!selectedDistributor} />
// //         </Form.Item>

// //         <Form.Item
// //           label="Email"
// //           name="email"
// //           rules={[
// //             { required: true, message: 'Please input the email!' },
// //             { type: 'email', message: 'Please enter a valid email!' }
// //           ]}
// //         >
// //           <Input placeholder="Enter email address" disabled={!selectedDistributor} />
// //         </Form.Item>

// //         <Form.Item>
// //           <Button type="primary" htmlType="submit" block loading={loading} disabled={!selectedDistributor}>
// //             {loading ? 'Updating...' : 'Update Distributor'}
// //           </Button>
// //         </Form.Item>
// //       </Form>

// //       <div style={{ height: '20%', overflowY: 'auto', marginTop: '20px' }}>
// //         <Title level={4}>Distributor List</Title>
// //         <Spin spinning={loading}>
// //           <List
// //             size="small"
// //             bordered
// //             dataSource={distributors}
// //             renderItem={item => (
// //               <List.Item key={item.id}>
// //                 <strong>{item.name}</strong> - {item.address}
// //                 <div>
// //                   Phone: {item.phone} | Email: {item.email}
// //                 </div>
// //               </List.Item>
// //             )}
// //           />
// //         </Spin>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default EditDistributorProfile;



// // import React, { useState, useEffect } from 'react';
// // import { Form, Input, Button, Card, Typography, List, Spin, message, Row, Col } from 'antd';
// // import { db } from '../../utilis/firebase';
// // import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// // const { Title } = Typography;

// // const EditDistributorProfile = () => {
// //   const [distributors, setDistributors] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [form] = Form.useForm();
// //   const [selectedDistributor, setSelectedDistributor] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     const fetchDistributors = async () => {
// //       setLoading(true);
// //       try {
// //         const snapshot = await getDocs(collection(db, 'distributors'));
// //         const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setDistributors(distributorList);
// //       } catch (error) {
// //         console.error('Error fetching distributors:', error);
// //         message.error('Failed to load distributors');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDistributors();
// //   }, []);

// //   const onSearch = () => {
// //     const distributor = distributors.find(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //     if (distributor) {
// //       setSelectedDistributor(distributor);
// //       form.setFieldsValue(distributor);
// //     } else {
// //       message.error('Distributor not found');
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //     }
// //   };

// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       const distributorRef = doc(db, 'distributors', selectedDistributor.id);
// //       await updateDoc(distributorRef, {
// //         name: values.name,
// //         address: values.address,
// //         phone: values.phone,
// //         email: values.email,
// //         updatedAt: serverTimestamp(),
// //       });
// //       message.success('Distributor updated successfully');
// //       // Clear the selected distributor and reset form
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //       // Re-fetch distributors to get updated data
// //       const snapshot = await getDocs(collection(db, 'distributors'));
// //       const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setDistributors(distributorList);
// //     } catch (error) {
// //       console.error('Error updating distributor:', error);
// //       message.error('Failed to update distributor');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
// //       <Title level={3} style={{ textAlign: 'center' }}>
// //         Edit Distributor
// //       </Title>
// //       <Input.Search
// //         placeholder="Search Distributor by Name"
// //         value={searchQuery}
// //         onChange={e => setSearchQuery(e.target.value)}
// //         onSearch={onSearch}
// //         enterButton
// //         style={{ marginBottom: '20px' }}
// //       />
// //       <Form form={form} name="edit_distributor" onFinish={onFinish} layout="vertical">
// //         <Row gutter={16}>
// //           <Col span={24}>
// //             <Form.Item
// //               label="Distributor Name"
// //               name="name"
// //               rules={[{ required: true, message: 'Please input the distributor name!' }]}
// //             >
// //               <Input placeholder="Enter distributor name" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={24}>
// //             <Form.Item
// //               label="Address"
// //               name="address"
// //               rules={[{ required: true, message: 'Please input the address!' }]}
// //             >
// //               <Input placeholder="Enter address" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item
// //               label="Phone Number"
// //               name="phone"
// //               rules={[
// //                 { required: true, message: 'Please input the phone number!' },
// //                 { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' }
// //               ]}
// //             >
// //               <Input placeholder="Enter phone number" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item
// //               label="Email"
// //               name="email"
// //               rules={[
// //                 { required: true, message: 'Please input the email!' },
// //                 { type: 'email', message: 'Please enter a valid email!' }
// //               ]}
// //             >
// //               <Input placeholder="Enter email address" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Form.Item>
// //           <Button type="primary" htmlType="submit" block loading={loading} disabled={!selectedDistributor}>
// //             {loading ? 'Updating...' : 'Update Distributor'}
// //           </Button>
// //         </Form.Item>
// //       </Form>

// //       <div style={{ height: '30%', overflowY: 'auto', marginTop: '20px' }}>
// //         <Title level={4}>Distributor List</Title>
// //         <Spin spinning={loading}>
// //           <List
// //             size="small"
// //             bordered
// //             dataSource={distributors}
// //             renderItem={item => (
// //               <List.Item key={item.id}>
// //                 <strong>{item.name}</strong> - {item.address}
// //                 <div>
// //                   Phone: {item.phone} | Email: {item.email}
// //                 </div>
// //               </List.Item>
// //             )}
// //           />
// //         </Spin>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default EditDistributorProfile;


// // import React, { useState, useEffect } from 'react';
// // import { Form, Input, Button, Card, Typography, List, Spin, message, Row, Col } from 'antd';
// // import { db } from '../../utilis/firebase';
// // import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// // const { Title } = Typography;

// // const EditDistributorProfile = () => {
// //   const [distributors, setDistributors] = useState([]);
// //   const [filteredDistributors, setFilteredDistributors] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [form] = Form.useForm();
// //   const [selectedDistributor, setSelectedDistributor] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     const fetchDistributors = async () => {
// //       setLoading(true);
// //       try {
// //         const snapshot = await getDocs(collection(db, 'distributors'));
// //         const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setDistributors(distributorList);
// //         setFilteredDistributors(distributorList); // Initialize filtered list
// //       } catch (error) {
// //         console.error('Error fetching distributors:', error);
// //         message.error('Failed to load distributors');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDistributors();
// //   }, []);

// //   const handleSearchChange = (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
// //     const filtered = distributors.filter(d =>
// //       d.name.toLowerCase().includes(query.toLowerCase())
// //     );
// //     setFilteredDistributors(filtered);

// //     if (filtered.length > 0) {
// //       setSelectedDistributor(filtered[0]); // Automatically select the first match
// //       form.setFieldsValue(filtered[0]); // Pre-fill the form with the selected distributor
// //     } else {
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //     }
// //   };

// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       const distributorRef = doc(db, 'distributors', selectedDistributor.id);
// //       await updateDoc(distributorRef, {
// //         name: values.name,
// //         address: values.address,
// //         phone: values.phone,
// //         email: values.email,
// //         updatedAt: serverTimestamp(),
// //       });
// //       message.success('Distributor updated successfully');
// //       // Clear the selected distributor and reset form
// //       setSelectedDistributor(null);
// //       form.resetFields();
// //       // Re-fetch distributors to get updated data
// //       const snapshot = await getDocs(collection(db, 'distributors'));
// //       const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setDistributors(distributorList);
// //       setFilteredDistributors(distributorList); // Update filtered list
// //     } catch (error) {
// //       console.error('Error updating distributor:', error);
// //       message.error('Failed to update distributor');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
// //       <Title level={3} style={{ textAlign: 'center' }}>
// //         Edit Distributor
// //       </Title>
// //       <Input.Search
// //         placeholder="Search Distributor by Name"
// //         value={searchQuery}
// //         onChange={handleSearchChange}
// //         style={{ marginBottom: '20px' }}
// //       />
// //       <Form form={form} name="edit_distributor" onFinish={onFinish} layout="vertical">
// //         <Row gutter={16}>
// //           <Col span={24}>
// //             <Form.Item
// //               label="Distributor Name"
// //               name="name"
// //               rules={[{ required: true, message: 'Please input the distributor name!' }]}
// //             >
// //               <Input placeholder="Enter distributor name" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={24}>
// //             <Form.Item
// //               label="Address"
// //               name="address"
// //               rules={[{ required: true, message: 'Please input the address!' }]}
// //             >
// //               <Input placeholder="Enter address" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item
// //               label="Phone Number"
// //               name="phone"
// //               rules={[
// //                 { required: true, message: 'Please input the phone number!' },
// //                 { pattern: /^\d{10}$/, message: 'Please enter a valid phone number!' }
// //               ]}
// //             >
// //               <Input placeholder="Enter phone number" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Form.Item
// //               label="Email"
// //               name="email"
// //               rules={[
// //                 { required: true, message: 'Please input the email!' },
// //                 { type: 'email', message: 'Please enter a valid email!' }
// //               ]}
// //             >
// //               <Input placeholder="Enter email address" disabled={!selectedDistributor} />
// //             </Form.Item>
// //           </Col>
// //         </Row>
// //         <Form.Item>
// //           <Button type="primary" htmlType="submit" block loading={loading} disabled={!selectedDistributor}>
// //             {loading ? 'Updating...' : 'Update Distributor'}
// //           </Button>
// //         </Form.Item>
// //       </Form>

// //       <div style={{ height: '30%', overflowY: 'auto', marginTop: '20px' }}>
// //         <Title level={4}>Distributor List</Title>
// //         <Spin spinning={loading}>
// //           <List
// //             size="small"
// //             bordered
// //             dataSource={filteredDistributors}
// //             renderItem={item => (
// //               <List.Item 
// //                 key={item.id}
// //                 onClick={() => {
// //                   setSelectedDistributor(item);
// //                   form.setFieldsValue(item); // Pre-fill the form with selected item
// //                 }}
// //                 style={{ cursor: 'pointer' }}
// //               >
// //                 <strong>{item.name}</strong> - {item.address}
// //                 <div>
// //                   Phone: {item.phone} | Email: {item.email}
// //                 </div>
// //               </List.Item>
// //             )}
// //           />
// //         </Spin>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default EditDistributorProfile;





































// import React, { useState, useEffect } from 'react';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
// import { message } from 'antd'; // Importing Ant Design's message

// const EditDistributorProfile = () => {
//   const [distributors, setDistributors] = useState([]);
//   const [filteredDistributors, setFilteredDistributors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//   });
//   const [selectedDistributor, setSelectedDistributor] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchDistributors = async () => {
//       setLoading(true);
//       try {
//         const snapshot = await getDocs(collection(db, 'distributors'));
//         const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setDistributors(distributorList);
//         setFilteredDistributors(distributorList); // Initialize filtered list
//       } catch (error) {
//         console.error('Error fetching distributors:', error);
//         message.error('Failed to load distributors');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDistributors();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filtered = distributors.filter(d =>
//       d.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredDistributors(filtered);

//     if (filtered.length > 0) {
//       setSelectedDistributor(filtered[0]); // Automatically select the first match
//       setFormValues(filtered[0]); // Pre-fill the form with the selected distributor
//     } else {
//       setSelectedDistributor(null);
//       setFormValues({
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedDistributor) return;

//     setLoading(true);
//     try {
//       const distributorRef = doc(db, 'distributors', selectedDistributor.id);
//       await updateDoc(distributorRef, {
//         ...formValues,
//         updatedAt: serverTimestamp(),
//       });
//       message.success('Distributor updated successfully');
//       setSelectedDistributor(null);
//       setFormValues({
//         name: '',
//         address: '',
//         phone: '',
//         email: '',
//       });
//       const snapshot = await getDocs(collection(db, 'distributors'));
//       const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setDistributors(distributorList);
//       setFilteredDistributors(distributorList); // Update filtered list
//     } catch (error) {
//       console.error('Error updating distributor:', error);
//       message.error('Failed to update distributor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h3 style={styles.title}>Edit Distributor</h3>
//       <input
//         type="text"
//         placeholder="Search Distributor by Name"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         style={styles.searchInput}
//       />
//       <form onSubmit={handleUpdate} style={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Distributor Name"
//           value={formValues.name}
//           onChange={handleInputChange}
//           disabled={!selectedDistributor}
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formValues.address}
//           onChange={handleInputChange}
//           disabled={!selectedDistributor}
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formValues.phone}
//           onChange={handleInputChange}
//           disabled={!selectedDistributor}
//           style={styles.input}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formValues.email}
//           onChange={handleInputChange}
//           disabled={!selectedDistributor}
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button} disabled={!selectedDistributor}>
//           {loading ? 'Updating...' : 'Update Distributor'}
//         </button>
//       </form>

//       <div style={styles.listContainer}>
//         <h4 style={styles.listTitle}>Distributor List</h4>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul style={styles.list}>
//             {filteredDistributors.map(item => (
//               <li
//                 key={item.id}
//                 onClick={() => {
//                   setSelectedDistributor(item);
//                   setFormValues(item);
//                 }}
//                 style={styles.listItem}
//               >
//                 <strong>{item.name}</strong> - {item.address}
//                 <div>
//                   Phone: {item.phone} | Email: {item.email}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: 'auto',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   searchInput: {
//     marginBottom: '20px',
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//   },
//   button: {
//     padding: '10px',
//     borderRadius: '5px',
//     border: 'none',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   listContainer: {
//     marginTop: '20px',
//     maxHeight: '300px',
//     overflowY: 'auto',
//   },
//   listTitle: {
//     marginBottom: '10px',
//   },
//   list: {
//     listStyleType: 'none',
//     padding: '0',
//   },
//   listItem: {
//     padding: '10px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     marginBottom: '10px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
// };

// export default EditDistributorProfile;














import React, { useState, useEffect } from 'react';
import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { message } from 'antd'; // Importing Ant Design's message

const EditDistributorProfile = () => {
  const [distributors, setDistributors] = useState([]);
  const [filteredDistributors, setFilteredDistributors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'distributors'));
        const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDistributors(distributorList);
        setFilteredDistributors(distributorList); // Initialize filtered list
      } catch (error) {
        console.error('Error fetching distributors:', error);
        message.error('Failed to load distributors');
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = distributors.filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDistributors(filtered);

    if (filtered.length > 0) {
      setSelectedDistributor(filtered[0]); // Automatically select the first match
      setFormValues(filtered[0]); // Pre-fill the form with the selected distributor
    } else {
      setSelectedDistributor(null);
      setFormValues({
        name: '',
        address: '',
        phone: '',
        email: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedDistributor) return;

    setLoading(true);
    try {
      const distributorRef = doc(db, 'distributors', selectedDistributor.id);
      await updateDoc(distributorRef, {
        ...formValues,
        updatedAt: serverTimestamp(),
      });
      message.success('Distributor updated successfully');
      setSelectedDistributor(null);
      setFormValues({
        name: '',
        address: '',
        phone: '',
        email: '',
      });
      const snapshot = await getDocs(collection(db, 'distributors'));
      const distributorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDistributors(distributorList);
      setFilteredDistributors(distributorList); // Update filtered list
    } catch (error) {
      console.error('Error updating distributor:', error);
      message.error('Failed to update distributor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Edit Distributor</h3>
      <input
        type="text"
        placeholder="Search Distributor by Name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Distributor Name"
            value={formValues.name}
            onChange={handleInputChange}
            disabled={!selectedDistributor}
            style={styles.input}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formValues.address}
            onChange={handleInputChange}
            disabled={!selectedDistributor}
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formValues.phone}
            onChange={handleInputChange}
            disabled={!selectedDistributor}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
            disabled={!selectedDistributor}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={!selectedDistributor}>
          {loading ? 'Updating...' : 'Update Distributor'}
        </button>
      </form>

      <div style={styles.listContainer}>
        <h4 style={styles.listTitle}>Distributor List</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={styles.list}>
            {filteredDistributors.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedDistributor(item);
                  setFormValues(item);
                }}
                style={styles.listItem}
              >
                <strong>{item.name}</strong> - {item.address}
                <div>
                  Phone: {item.phone} | Email: {item.email}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    height: '90vh', // Set height to 90vh
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  searchInput: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    marginRight: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '48%', // Set width to 48% to fit two inputs in a row
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  listContainer: {
    marginTop: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  listTitle: {
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EditDistributorProfile;
