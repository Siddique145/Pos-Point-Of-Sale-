// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Form,
// // //   Input,
// // //   InputNumber,
// // //   Select,
// // //   Switch,
// // //   Button,
// // //   Card,
// // //   Typography,
// // //   Space,
// // //   Spin,
// // //   message,
// // // } from 'antd';
// // // import { PlusOutlined } from '@ant-design/icons';
// // // import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
// // // import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config

// // // const { Title } = Typography;
// // // const { Option } = Select;

// // // export default function AddItemProfile() {
// // //   const [form] = Form.useForm();
// // //   const [loading, setLoading] = useState(false);
// // //   const [categories, setCategories] = useState([]);
// // //   const [companies, setCompanies] = useState([]);
// // //   const [distributors, setDistributors] = useState([]);
// // //   const [generics, setGenerics] = useState([]);
// // //   const [itemCount, setItemCount] = useState(0);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const categoriesSnapshot = await getDocs(collection(db, 'categories'));
// // //         setCategories(categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //         const companiesSnapshot = await getDocs(collection(db, 'companies'));
// // //         setCompanies(companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //         const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
// // //         setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //         const genericsSnapshot = await getDocs(collection(db, 'genericProfiles'));
// // //         setGenerics(genericsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //         const itemsSnapshot = await getDocs(collection(db, 'items'));
// // //         setItemCount(itemsSnapshot.size);
// // //       } catch (error) {
// // //         console.error('Error fetching data:', error);
// // //         message.error('Failed to load data. Please try again.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const onFinish = async (values) => {
// // //     setLoading(true);
// // //     try {
// // //       const newItemData = {
// // //         ...values,
// // //         itemNo: itemCount,
// // //         createdAt: serverTimestamp(),
// // //       };
// // //       await addDoc(collection(db, 'items'), newItemData);
// // //       message.success('Item added successfully');
// // //       form.resetFields();
// // //       setItemCount(prevCount => prevCount + 1);
// // //     } catch (error) {
// // //       console.error('Error adding item:', error);
// // //       message.error('Failed to add item. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
// // //       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
// // //         Add New Item
// // //       </Title>
// // //       <Form
// // //         form={form}
// // //         name="add_item_profile"
// // //         onFinish={onFinish}
// // //         layout="vertical"
// // //         initialValues={{ canSaleLoose: false }}
// // //       >
// // //         <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
// // //           <Form.Item label="Item No" style={{ marginBottom: 0 }}>
// // //             <span className="ant-form-text">{itemCount}</span>
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="itemName"
// // //             label="Item Name"
// // //             rules={[{ required: true, message: 'Please input the item name!' }]}
// // //           >
// // //             <Input />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="categoryId"
// // //             label="Category"
// // //             rules={[{ required: true, message: 'Please select a category!' }]}
// // //           >
// // //             <Select
// // //               showSearch
// // //               placeholder="Select a category"
// // //               optionFilterProp="children"
// // //               filterOption={(input, option) =>
// // //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// // //               }
// // //             >
// // //               {categories.map(category => (
// // //                 <Option key={category.id} value={category.id}>{category.categoryName}</Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="companyId"
// // //             label="Company"
// // //             rules={[{ required: true, message: 'Please select a company!' }]}
// // //           >
// // //             <Select
// // //               showSearch
// // //               placeholder="Select a company"
// // //               optionFilterProp="children"
// // //               filterOption={(input, option) =>
// // //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// // //               }
// // //             >
// // //               {companies.map(company => (
// // //                 <Option key={company.id} value={company.id}>{company.name}</Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="genericId"
// // //             label="Generic"
// // //             rules={[{ required: true, message: 'Please select a generic!' }]}
// // //           >
// // //             <Select
// // //               showSearch
// // //               placeholder="Select a generic"
// // //               optionFilterProp="children"
// // //               filterOption={(input, option) =>
// // //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// // //               }
// // //             >
// // //               {generics.map(generic => (
// // //                 <Option key={generic.id} value={generic.id}>{generic.name}</Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="distributorId"
// // //             label="Distributor"
// // //             rules={[{ required: true, message: 'Please select a distributor!' }]}
// // //           >
// // //             <Select
// // //               showSearch
// // //               placeholder="Select a distributor"
// // //               optionFilterProp="children"
// // //               filterOption={(input, option) =>
// // //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// // //               }
// // //             >
// // //               {distributors.map(distributor => (
// // //                 <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
// // //               ))}
// // //             </Select>
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="stock"
// // //             label="Stock in Pack"
// // //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// // //           >
// // //             <InputNumber min={0} style={{ width: '100%' }} />
// // //           </Form.Item>
// // //           <Form.Item
// // //             name="stockofunits"
// // //             label="Stock of Units"
// // //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// // //           >
// // //             <InputNumber min={0} style={{ width: '100%' }} />
// // //           </Form.Item>
// // //           <Form.Item
// // //             name="minimumquantity"
// // //             label="Minimum Quantity"
// // //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// // //           >
// // //             <InputNumber min={0} style={{ width: '100%' }} />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="canSaleLoose"
// // //             label="Can Sale Loose"
// // //             valuePropName="checked"
// // //           >
// // //             <Switch />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="packingType"
// // //             label="Packing Type"
// // //             rules={[{ required: true, message: 'Please input the packing type!' }]}
// // //           >
// // //             <Input />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="unitsInPack"
// // //             label="Units in Pack"
// // //             rules={[{ required: true, message: 'Please input the units in pack!' }]}
// // //           >
// // //             <InputNumber min={1} style={{ width: '100%' }} />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="stripsInPack"
// // //             label="Strips in Pack"
// // //             rules={[{ required: true, message: 'Please input the strips in pack!' }]}
// // //           >
// // //             <InputNumber min={1} style={{ width: '100%' }} />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="unitsInStrip"
// // //             label="Units in Strip"
// // //             rules={[{ required: true, message: 'Please input the units in strip!' }]}
// // //           >
// // //             <InputNumber min={1} style={{ width: '100%' }} />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="packRetailPrice"
// // //             label="Pack Retail Price"
// // //             rules={[{ required: true, message: 'Please input the pack retail price!' }]}
// // //           >
// // //             <InputNumber
// // //               min={0}
// // //               step={0.01}
// // //               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// // //               parser={value => value.replace(/₹\s?|(,*)/g, '')}
// // //               style={{ width: '100%' }}
// // //             />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="tpRate"
// // //             label="TP Rate (15% off Pack Rate)"
// // //             rules={[{ required: true, message: 'Please input the TP rate!' }]}
// // //           >
// // //             <InputNumber
// // //               min={0}
// // //               step={0.01}
// // //               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// // //               parser={value => value.replace(/₹\s?|(,*)/g, '')}
// // //               style={{ width: '100%' }}
// // //             />
// // //           </Form.Item>

// // //           <Form.Item
// // //             name="gst"
// // //             label="GST (%)"
// // //             rules={[{ required: true, message: 'Please input the GST percentage!' }]}
// // //           >
// // //             <InputNumber min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace('%', '')} style={{ width: '100%' }} />
// // //           </Form.Item>

// // //           <Form.Item>
// // //             <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
// // //               Add Item
// // //             </Button>
// // //           </Form.Item>
// // //         </Space>
// // //       </Form>
// // //     </Card>
// // //   );
// // // }

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Form,
// //   Input,
// //   InputNumber,
// //   Select,
// //   Switch,
// //   Button,
// //   Card,
// //   Typography,
// //   Space,
// //   Spin,
// //   message,
// // } from 'antd';
// // import { PlusOutlined } from '@ant-design/icons';
// // import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
// // import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config

// // const { Title } = Typography;
// // const { Option } = Select;

// // export default function AddItemProfile() {
// //   const [form] = Form.useForm();
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [distributors, setDistributors] = useState([]);
// //   const [generics, setGenerics] = useState([]);
// //   const [itemCount, setItemCount] = useState(0);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const categoriesSnapshot = await getDocs(collection(db, 'categories'));
// //         setCategories(categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //         const companiesSnapshot = await getDocs(collection(db, 'companies'));
// //         setCompanies(companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //         const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
// //         setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //         const genericsSnapshot = await getDocs(collection(db, 'genericProfiles'));
// //         setGenerics(genericsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //         const itemsSnapshot = await getDocs(collection(db, 'items'));
// //         setItemCount(itemsSnapshot.size);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //         message.error('Failed to load data. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handlePackRetailPriceChange = (value) => {
// //     if (value) {
// //       const tpRate = value - (value * 0.15);
// //       form.setFieldsValue({ tpRate });
// //     } else {
// //       form.setFieldsValue({ tpRate: null });
// //     }
// //   };

// //   const onFinish = async (values) => {
// //     setLoading(true);
// //     try {
// //       const newItemData = {
// //         ...values,
// //         itemNo: itemCount,
// //         createdAt: serverTimestamp(),
// //       };
// //       await addDoc(collection(db, 'items'), newItemData);
// //       message.success('Item added successfully');
// //       form.resetFields();
// //       setItemCount(prevCount => prevCount + 1);
// //     } catch (error) {
// //       console.error('Error adding item:', error);
// //       message.error('Failed to add item. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
// //       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
// //         Add New Item
// //       </Title>
// //       <Form
// //         form={form}
// //         name="add_item_profile"
// //         onFinish={onFinish}
// //         layout="vertical"
// //         initialValues={{ canSaleLoose: false }}
// //       >
// //         <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
// //           <Form.Item label="Item No" style={{ marginBottom: 0 }}>
// //             <span className="ant-form-text">{itemCount}</span>
// //           </Form.Item>

// //           <Form.Item
// //             name="itemName"
// //             label="Item Name"
// //             rules={[{ required: true, message: 'Please input the item name!' }]}
// //           >
// //             <Input />
// //           </Form.Item>

// //           <Form.Item
// //             name="categoryId"
// //             label="Category"
// //             rules={[{ required: true, message: 'Please select a category!' }]}
// //           >
// //             <Select
// //               showSearch
// //               placeholder="Select a category"
// //               optionFilterProp="children"
// //               filterOption={(input, option) =>
// //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// //               }
// //             >
// //               {categories.map(category => (
// //                 <Option key={category.id} value={category.id}>{category.categoryName}</Option>
// //               ))}
// //             </Select>
// //           </Form.Item>

// //           <Form.Item
// //             name="companyId"
// //             label="Company"
// //             rules={[{ required: true, message: 'Please select a company!' }]}
// //           >
// //             <Select
// //               showSearch
// //               placeholder="Select a company"
// //               optionFilterProp="children"
// //               filterOption={(input, option) =>
// //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// //               }
// //             >
// //               {companies.map(company => (
// //                 <Option key={company.id} value={company.id}>{company.name}</Option>
// //               ))}
// //             </Select>
// //           </Form.Item>

// //           <Form.Item
// //             name="genericId"
// //             label="Generic"
// //             rules={[{ required: true, message: 'Please select a generic!' }]}
// //           >
// //             <Select
// //               showSearch
// //               placeholder="Select a generic"
// //               optionFilterProp="children"
// //               filterOption={(input, option) =>
// //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// //               }
// //             >
// //               {generics.map(generic => (
// //                 <Option key={generic.id} value={generic.id}>{generic.name}</Option>
// //               ))}
// //             </Select>
// //           </Form.Item>

// //           <Form.Item
// //             name="distributorId"
// //             label="Distributor"
// //             rules={[{ required: true, message: 'Please select a distributor!' }]}
// //           >
// //             <Select
// //               showSearch
// //               placeholder="Select a distributor"
// //               optionFilterProp="children"
// //               filterOption={(input, option) =>
// //                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
// //               }
// //             >
// //               {distributors.map(distributor => (
// //                 <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
// //               ))}
// //             </Select>
// //           </Form.Item>

// //           <Form.Item
// //             name="stock"
// //             label="Stock in Pack"
// //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// //           >
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="stockofunits"
// //             label="Stock of Units"
// //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// //           >
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="minimumquantity"
// //             label="Minimum Quantity"
// //             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
// //           >
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="canSaleLoose"
// //             label="Can Sale Loose"
// //             valuePropName="checked"
// //           >
// //             <Switch />
// //           </Form.Item>

// //           <Form.Item
// //             name="packingType"
// //             label="Packing Type"
// //             rules={[{ required: true, message: 'Please input the packing type!' }]}
// //           >
// //             <Input />
// //           </Form.Item>

// //           <Form.Item
// //             name="unitsInPack"
// //             label="Units in Pack"
// //             rules={[{ required: true, message: 'Please input the units in pack!' }]}
// //           >
// //             <InputNumber min={1} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="stripsInPack"
// //             label="Strips in Pack"
// //             rules={[{ required: true, message: 'Please input the strips in pack!' }]}
// //           >
// //             <InputNumber min={1} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="unitsInStrip"
// //             label="Units in Strip"
// //             rules={[{ required: true, message: 'Please input the units in strip!' }]}
// //           >
// //             <InputNumber min={1} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item
// //             name="packRetailPrice"
// //             label="Pack Retail Price"
// //             rules={[{ required: true, message: 'Please input the pack retail price!' }]}
// //           >
// //             <InputNumber
// //               min={0}
// //               step={0.01}
// //               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// //               parser={value => value.replace(/₹\s?|(,*)/g, '')}
// //               onChange={handlePackRetailPriceChange}
// //               style={{ width: '100%' }}
// //             />
// //           </Form.Item>

// //           <Form.Item
// //             name="tpRate"
// //             label="TP Rate (15% off Pack Rate)"
// //             rules={[{ required: true, message: 'Please input the TP rate!' }]}
// //           >
// //             <InputNumber
// //               min={0}
// //               step={0.01}
// //               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// //               parser={value => value.replace(/₹\s?|(,*)/g, '')}
// //               style={{ width: '100%' }}
// //               // disabled // Disable to prevent manual editing
// //             />
// //           </Form.Item>

// //           <Form.Item
// //             name="gst"
// //             label="GST (%)"
// //             rules={[{ required: true, message: 'Please input the GST percentage!' }]}
// //           >
// //             <InputNumber min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace('%', '')} style={{ width: '100%' }} />
// //           </Form.Item>

// //           <Form.Item>
// //             <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
// //               Add Item
// //             </Button>
// //           </Form.Item>
// //         </Space>
// //       </Form>
// //     </Card>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Switch,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Spin,
//   message,
//   DatePicker,
// } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config

// const { Title } = Typography;
// const { Option } = Select;

// export default function AddItemProfile() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [distributors, setDistributors] = useState([]);
//   const [generics, setGenerics] = useState([]);
//   const [itemCount, setItemCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const categoriesSnapshot = await getDocs(collection(db, 'categories'));
//         setCategories(categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const companiesSnapshot = await getDocs(collection(db, 'companies'));
//         setCompanies(companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
//         setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const genericsSnapshot = await getDocs(collection(db, 'genericProfiles'));
//         setGenerics(genericsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const itemsSnapshot = await getDocs(collection(db, 'items'));
//         setItemCount(itemsSnapshot.size);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         message.error('Failed to load data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePackRetailPriceChange = (value) => {
//     if (value) {
//       const tpRate = value - (value * 0.15);
//       form.setFieldsValue({ tpRate });
//     } else {
//       form.setFieldsValue({ tpRate: null });
//     }
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const newItemData = {
//         ...values,
//         itemNo: itemCount,
//         createdAt: serverTimestamp(),
//       };
//       await addDoc(collection(db, 'items'), newItemData);
//       message.success('Item added successfully');
//       form.resetFields();
//       setItemCount(prevCount => prevCount + 1);
//     } catch (error) {
//       console.error('Error adding item:', error);
//       message.error('Failed to add item. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
//         Add New Item
//       </Title>
//       <Form
//         form={form}
//         name="add_item_profile"
//         onFinish={onFinish}
//         layout="vertical"
//         initialValues={{ canSaleLoose: false }}
//       >
//         <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
//           <Form.Item label="Item No" style={{ marginBottom: 0 }}>
//             <span className="ant-form-text">{itemCount}</span>
//           </Form.Item>

//           <Form.Item
//             name="itemName"
//             label="Item Name"
//             rules={[{ required: true, message: 'Please input the item name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="categoryId"
//             label="Category"
//             rules={[{ required: true, message: 'Please select a category!' }]}
//           >
//             <Select
//               showSearch
//               placeholder="Select a category"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//               }
//             >
//               {categories.map(category => (
//                 <Option key={category.id} value={category.id}>{category.categoryName}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="companyId"
//             label="Company"
//             rules={[{ required: true, message: 'Please select a company!' }]}
//           >
//             <Select
//               showSearch
//               placeholder="Select a company"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//               }
//             >
//               {companies.map(company => (
//                 <Option key={company.id} value={company.id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="genericId"
//             label="Generic"
//             rules={[{ required: true, message: 'Please select a generic!' }]}
//           >
//             <Select
//               showSearch
//               placeholder="Select a generic"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//               }
//             >
//               {generics.map(generic => (
//                 <Option key={generic.id} value={generic.id}>{generic.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="distributorId"
//             label="Distributor"
//             rules={[{ required: true, message: 'Please select a distributor!' }]}
//           >
//             <Select
//               showSearch
//               placeholder="Select a distributor"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//               }
//             >
//               {distributors.map(distributor => (
//                 <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="stock"
//             label="Stock in Pack"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="stockofunits"
//             label="Stock of Units"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="minimumquantity"
//             label="Minimum Quantity"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="canSaleLoose"
//             label="Can Sale Loose"
//             valuePropName="checked"
//           >
//             <Switch />
//           </Form.Item>

//           <Form.Item
//             name="packingType"
//             label="Packing Type"
//             rules={[{ required: true, message: 'Please input the packing type!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="unitsInPack"
//             label="Units in Pack"
//             rules={[{ required: true, message: 'Please input the units in pack!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="stripsInPack"
//             label="Strips in Pack"
//             rules={[{ required: true, message: 'Please input the strips in pack!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="unitsInStrip"
//             label="Units in Strip"
//             rules={[{ required: true, message: 'Please input the units in strip!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="packRetailPrice"
//             label="Pack Retail Price"
//             rules={[{ required: true, message: 'Please input the pack retail price!' }]}
//           >
//             <InputNumber
//               min={0}
//               step={0.01}
//               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               parser={value => value.replace(/₹\s?|(,*)/g, '')}
//               onChange={handlePackRetailPriceChange}
//               style={{ width: '100%' }}
//             />
//           </Form.Item>

//           <Form.Item
//             name="tpRate"
//             label="TP Rate (15% off Pack Rate)"
//             rules={[{ required: true, message
//               : 'Please input the TP rate!' }]}
//               >
//                 <InputNumber
//                   min={0}
//                   step={0.01}
//                   formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                   parser={value => value.replace(/₹\s?|(,*)/g, '')}
//                   style={{ width: '100%' }}
//                   disabled // Disable to prevent manual editing
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="gst"
//                 label="GST (%)"
//                 rules={[{ required: true, message: 'Please input the GST percentage!' }]}
//               >
//                 <InputNumber
//                   min={0}
//                   max={100}
//                   formatter={value => `${value}%`}
//                   parser={value => value.replace('%', '')}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>

//               {/* Manufacturing Date Field */}
//               <Form.Item
//                 name="manufacturingDate"
//                 label="Manufacturing Date"
//                 rules={[{ required: true, message: 'Please select the manufacturing date!' }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>

//               {/* Expiry Date Field */}
//               <Form.Item
//                 name="expiryDate"
//                 label="Expiry Date"
//                 rules={[{ required: true, message: 'Please select the expiry date!' }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
//                   Add Item
//                 </Button>
//               </Form.Item>
//             </Space>
//           </Form>
//         </Card>
//       );
//     }

// import React, { useState, useEffect } from 'react';
// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Switch,
//   Button,
//   Card,
//   Typography,
//   Space,
//   Spin,
//   message,
//   DatePicker,
// } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { collection, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
// import { db } from '../../utilis/firebase';

// const { Title } = Typography;
// const { Option } = Select;

// export default function AddItemProfile() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [distributors, setDistributors] = useState([]);
//   const [generics, setGenerics] = useState([]);
//   const [itemCount, setItemCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const categoriesSnapshot = await getDocs(collection(db, 'categories'));
//         setCategories(categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const companiesSnapshot = await getDocs(collection(db, 'companies'));
//         setCompanies(companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
//         setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const genericsSnapshot = await getDocs(collection(db, 'genericProfiles'));
//         setGenerics(genericsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const itemsSnapshot = await getDocs(collection(db, 'items'));
//         setItemCount(itemsSnapshot.size);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         message.error('Failed to load data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePackRetailPriceChange = (value) => {
//     if (value) {
//       const tpRate = value - (value * 0.15);
//       form.setFieldsValue({ tpRate });
//     } else {
//       form.setFieldsValue({ tpRate: null });
//     }
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       // Convert date fields to JavaScript Date
//       const manufacturingDate = values.manufacturingDate.toDate(); // Convert to Date object
//       const expiryDate = values.expiryDate.toDate(); // Convert to Date object

//       // Prepare data for Firestore
//       const newItemData = {
//         ...values,
//         itemNo: itemCount,
//         createdAt: serverTimestamp(),
//         manufacturingDate: Timestamp.fromDate(manufacturingDate), // Firestore compatible
//         expiryDate: Timestamp.fromDate(expiryDate), // Firestore compatible
//       };

//       await addDoc(collection(db, 'items'), newItemData);
//       message.success('Item added successfully');
//       form.resetFields();
//       setItemCount(prevCount => prevCount + 1);
//     } catch (error) {
//       console.error('Error adding item:', error);
//       message.error('Failed to add item. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
//       <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
//         Add New Item
//       </Title>
//       <Form
//         form={form}
//         name="add_item_profile"
//         onFinish={onFinish}
//         layout="vertical"
//         initialValues={{ canSaleLoose: false }}
//       >
//         <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
//           <Form.Item label="Item No" style={{ marginBottom: 0 }}>
//             <span className="ant-form-text">{itemCount}</span>
//           </Form.Item>

//           <Form.Item
//             name="itemName"
//             label="Item Name"
//             rules={[{ required: true, message: 'Please input the item name!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="categoryId"
//             label="Category"
//             rules={[{ required: true, message: 'Please select a category!' }]}
//           >
//             <Select showSearch placeholder="Select a category" optionFilterProp="children">
//               {categories.map(category => (
//                 <Option key={category.id} value={category.id}>{category.categoryName}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="companyId"
//             label="Company"
//             rules={[{ required: true, message: 'Please select a company!' }]}
//           >
//             <Select showSearch placeholder="Select a company" optionFilterProp="children">
//               {companies.map(company => (
//                 <Option key={company.id} value={company.id}>{company.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="genericId"
//             label="Generic"
//             rules={[{ required: true, message: 'Please select a generic!' }]}
//           >
//             <Select showSearch placeholder="Select a generic" optionFilterProp="children">
//               {generics.map(generic => (
//                 <Option key={generic.id} value={generic.id}>{generic.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="distributorId"
//             label="Distributor"
//             rules={[{ required: true, message: 'Please select a distributor!' }]}
//           >
//             <Select showSearch placeholder="Select a distributor" optionFilterProp="children">
//               {distributors.map(distributor => (
//                 <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="stock"
//             label="Stock in Pack"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="stockofunits"
//             label="Stock of Units"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="minimumquantity"
//             label="Minimum Quantity"
//             rules={[{ required: true, message: 'Please input the quantity needed!' }]}
//           >
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="canSaleLoose"
//             label="Can Sale Loose"
//             valuePropName="checked"
//           >
//             <Switch />
//           </Form.Item>

//           <Form.Item
//             name="packingType"
//             label="Packing Type"
//             rules={[{ required: true, message: 'Please input the packing type!' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="unitsInPack"
//             label="Units in Pack"
//             rules={[{ required: true, message: 'Please input the units in pack!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="stripsInPack"
//             label="Strips in Pack"
//             rules={[{ required: true, message: 'Please input the strips in pack!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="unitsInStrip"
//             label="Units in Strip"
//             rules={[{ required: true, message: 'Please input the units in strip!' }]}
//           >
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="packRetailPrice"
//             label="Pack Retail Price"
//             rules={[{ required: true, message: 'Please input the pack retail price!' }]}
//           >
//             <InputNumber
//               min={0}
//               step={0.01}
//               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               parser={value => value.replace(/₹\s?|(,*)/g, '')}
//               onChange={handlePackRetailPriceChange}
//               style={{ width: '100%' }}
//             />
//           </Form.Item>

//           <Form.Item
//             name="tpRate"
//             label="TP Rate (15% off Pack Rate)"
//             rules={[{ required: true, message: 'Please input the TP rate!' }]}
//           >
//             <InputNumber
//               min={0}
//               step={0.01}
//               formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               parser={value => value.replace(/₹\s?|(,*)/g, '')}
//               style={{ width: '100%' }}
//               disabled // Disable to prevent manual editing
//             />
//           </Form.Item>

//           <Form.Item
//             name="gst"
//             label="GST (%)"
//             rules={[{ required: true, message: 'Please input the GST percentage!' }]}
//           >
//             <InputNumber min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace('%', '')} style={{ width: '100%' }} />
//           </Form.Item>

//           {/* Manufacturing Date Field */}
//           <Form.Item
//             name="manufacturingDate"
//             label="Manufacturing Date"
//             rules={[{ required: true, message: 'Please select the manufacturing date!' }]}
//           >
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>

//           {/* Expiry Date Field */}
//           <Form.Item
//             name="expiryDate"
//             label="Expiry Date"
//             rules={[{ required: true, message: 'Please select the expiry date!' }]}
//           >
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
//               Add Item
//             </Button>
//           </Form.Item>
//         </Space>
//       </Form>
//     </Card>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Card,
  Typography,
  Space,
  Spin,
  message,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../utilis/firebase";

const { Title } = Typography;
const { Option } = Select;

export default function AddItemProfile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [generics, setGenerics] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const companiesSnapshot = await getDocs(collection(db, "companies"));
        setCompanies(
          companiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const distributorsSnapshot = await getDocs(
          collection(db, "distributors")
        );
        setDistributors(
          distributorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        const genericsSnapshot = await getDocs(
          collection(db, "genericProfiles")
        );
        setGenerics(
          genericsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        const itemsSnapshot = await getDocs(collection(db, "items"));
        setItemCount(itemsSnapshot.size);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePackRetailPriceChange = (value) => {
    if (value) {
      const tpRate = value - value * 0.15;
      form.setFieldsValue({ tpRate });
    } else {
      form.setFieldsValue({ tpRate: null });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const manufacturingDate = values.manufacturingDate.toDate();
      const expiryDate = values.expiryDate.toDate();

      const newItemData = {
        ...values,
        itemNo: itemCount,
        createdAt: serverTimestamp(),
        manufacturingDate: Timestamp.fromDate(manufacturingDate),
        expiryDate: Timestamp.fromDate(expiryDate),
      };

      await addDoc(collection(db, "items"), newItemData);
      message.success("Item added successfully");
      form.resetFields();
      setItemCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error adding item:", error);
      message.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: "100%", margin: "auto", padding: "10px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "10px" }}>
        Add New Item
      </Title>
      <Form
        form={form}
        name="add_item_profile"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          canSaleLoose: false,
          stock: 0, // Default value for stock
          stockofunits: 0, // Default value for stock of units
        }}
      >
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          <Form.Item label="Item No" style={{ marginBottom: 0 }}>
            <span className="ant-form-text">{itemCount}</span>
          </Form.Item>

          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: "Please input the item name!" }]}
          >
            <Input />
          </Form.Item>

          <div style={styles.row}>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
              style={styles.formItem}
            >
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
              >
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="companyId"
              label="Company"
              rules={[{ required: true, message: "Please select a company!" }]}
              style={styles.formItem}
            >
              <Select
                showSearch
                placeholder="Select a company"
                optionFilterProp="children"
              >
                {companies.map((company) => (
                  <Option key={company.id} value={company.id}>
                    {company.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={styles.row}>
            <Form.Item
              name="genericId"
              label="Generic"
              rules={[{ required: true, message: "Please select a generic!" }]}
              style={styles.formItem}
            >
              <Select
                showSearch
                placeholder="Select a generic"
                optionFilterProp="children"
              >
                {generics.map((generic) => (
                  <Option key={generic.id} value={generic.id}>
                    {generic.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="distributorId"
              label="Distributor"
              rules={[
                { required: true, message: "Please select a distributor!" },
              ]}
              style={styles.formItem}
            >
              <Select
                showSearch
                placeholder="Select a distributor"
                optionFilterProp="children"
              >
                {distributors.map((distributor) => (
                  <Option key={distributor.id} value={distributor.id}>
                    {distributor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={styles.row}>
            <Form.Item
              name="stock"
              label="Stock of Pack"
              rules={[
                {
                  required: true,
                  message: "Please input the quantity needed!",
                },
              ]}
              style={styles.formItem}
              value="0"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="stockofunits"
              label="Stock of Units"
              rules={[
                {
                  required: true,
                  message: "Please input the quantity needed!",
                },
              ]}
              style={styles.formItem}
              value="0"
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item
            name="minimumquantity"
            label="Minimum Quantity"
            rules={[
              { required: true, message: "Please input the quantity needed!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="canSaleLoose"
            label="Can Sale Loose"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="packingType"
            label="Packing Type"
            rules={[
              { required: true, message: "Please input the packing type!" },
            ]}
          >
            <Input />
          </Form.Item>

          <div style={styles.row}>
            <Form.Item
              name="unitsInPack"
              label="Units in Pack"
              rules={[
                { required: true, message: "Please input the units in pack!" },
              ]}
              style={styles.formItem}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="stripsInPack"
              label="Strips in Pack"
              rules={[
                { required: true, message: "Please input the strips in pack!" },
              ]}
              style={styles.formItem}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div style={styles.row}>
            <Form.Item
              name="unitsInStrip"
              label="Units in Strip"
              rules={[
                { required: true, message: "Please input the units in strip!" },
              ]}
              style={styles.formItem}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="packRetailPrice"
              label="Pack Retail Price"
              rules={[
                {
                  required: true,
                  message: "Please input the pack retail price!",
                },
              ]}
            >
              <InputNumber
                min={0}
                step={0.01}
                formatter={(value) =>
                  `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                onChange={handlePackRetailPriceChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="tpRate"
            label="TP Rate (15% off Pack Rate)"
            rules={[{ required: true, message: "Please input the TP rate!" }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              formatter={(value) =>
                `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
              style={{ width: "100%" }}
              // disabled
            />
          </Form.Item>

          <Form.Item
            name="gst"
            label="GST (%)"
            rules={[
              { required: true, message: "Please input the GST percentage!" },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div style={styles.row}>
            <Form.Item
              name="manufacturingDate"
              label="Manufacturing Date"
              rules={[
                {
                  required: true,
                  message: "Please select the manufacturing date!",
                },
              ]}
              style={styles.formItem}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[
                { required: true, message: "Please select the expiry date!" },
              ]}
              style={styles.formItem}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={loading}
              block
            >
              Add Item
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3px",
    marginBottom: "0px",
  },
  formItem: {
    flex: 1,
    marginBottom: "0", // Remove bottom margin for compactness
  },
};
