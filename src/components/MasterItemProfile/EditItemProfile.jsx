// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import {
// // // // // //   Form,
// // // // // //   Input,
// // // // // //   InputNumber,
// // // // // //   Select,
// // // // // //   Button,
// // // // // //   Card,
// // // // // //   Typography,
// // // // // //   Space,
// // // // // //   message,
// // // // // //   Modal,
// // // // // //   Table,
// // // // // //   Row,
// // // // // //   Col,
// // // // // // } from "antd";
// // // // // // import {
// // // // // //   EditOutlined,
// // // // // //   DeleteOutlined,
// // // // // //   SearchOutlined,
// // // // // // } from "@ant-design/icons";
// // // // // // import {
// // // // // //   collection,
// // // // // //   getDocs,
// // // // // //   doc,
// // // // // //   updateDoc,
// // // // // //   deleteDoc,
// // // // // // } from "firebase/firestore";
// // // // // // import { db } from "../../utilis/firebase";
// // // // // // import debounce from "lodash/debounce";

// // // // // // const { Title } = Typography;
// // // // // // const { Option } = Select;

// // // // // // export default function EditItemProfile() {
// // // // // //   const [form] = Form.useForm();
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [items, setItems] = useState([]);
// // // // // //   const [filteredItems, setFilteredItems] = useState([]);
// // // // // //   const [categories, setCategories] = useState([]);
// // // // // //   const [companies, setCompanies] = useState([]);
// // // // // //   const [distributors, setDistributors] = useState([]);
// // // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // // // // //   const [searchText, setSearchText] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (searchText) {
// // // // // //       debouncedSearch(searchText);
// // // // // //     } else {
// // // // // //       setFilteredItems(items);
// // // // // //     }
// // // // // //   }, [searchText, items]);

// // // // // //   const fetchData = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const itemsSnapshot = await getDocs(collection(db, "items"));
// // // // // //       const categoriesSnapshot = await getDocs(collection(db, "categories"));
// // // // // //       const companiesSnapshot = await getDocs(collection(db, "companies"));
// // // // // //       const distributorsSnapshot = await getDocs(
// // // // // //         collection(db, "distributors")
// // // // // //       );

// // // // // //       const fetchedItems = itemsSnapshot.docs.map((doc) => ({
// // // // // //         id: doc.id,
// // // // // //         ...doc.data(),
// // // // // //         retailPrice: doc.data().retailPrice || 0,
// // // // // //         tradePrice: doc.data().tradePrice || 0,
// // // // // //       }));
// // // // // //       console.log("Fetched Items:", fetchedItems);

// // // // // //       setItems(fetchedItems);
// // // // // //       setFilteredItems(fetchedItems);
// // // // // //       setCategories(
// // // // // //         categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // // //       );
// // // // // //       setCompanies(
// // // // // //         companiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // // //       );
// // // // // //       setDistributors(
// // // // // //         distributorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // // //       );
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching data:", error);
// // // // // //       message.error("Failed to load data. Please try again.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const debouncedSearch = debounce((search) => {
// // // // // //     const lowerCaseSearch = search.toLowerCase();
// // // // // //     const filtered = items.filter((item) =>
// // // // // //       item.itemName.toLowerCase().includes(lowerCaseSearch)
// // // // // //     );
// // // // // //     setFilteredItems(filtered);
// // // // // //   }, 300);

// // // // // //   const showEditModal = (record) => {
// // // // // //     setEditingItem(record);
// // // // // //     form.setFieldsValue(record);
// // // // // //     setIsModalVisible(true);
// // // // // //   };

// // // // // //   const handleCancel = () => {
// // // // // //     setIsModalVisible(false);
// // // // // //     setEditingItem(null);
// // // // // //     form.resetFields();
// // // // // //   };

// // // // // //   const handleUpdate = async (values) => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const itemRef = doc(db, "items", editingItem.id);
// // // // // //       const updatedItem = {
// // // // // //         ...editingItem,
// // // // // //         ...values,
// // // // // //         retailPrice: parseFloat(values.retailPrice),
// // // // // //         tradePrice: parseFloat(values.tradePrice),
// // // // // //       };
// // // // // //       await updateDoc(itemRef, updatedItem);
// // // // // //       message.success("Item updated successfully");
// // // // // //       setIsModalVisible(false);
// // // // // //       fetchData();
// // // // // //     } catch (error) {
// // // // // //       console.error("Error updating item:", error);
// // // // // //       message.error("Failed to update item. Please try again.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDelete = async (id) => {
// // // // // //     Modal.confirm({
// // // // // //       title: "Are you sure you want to delete this item?",
// // // // // //       content: "This action cannot be undone.",
// // // // // //       onOk: async () => {
// // // // // //         setLoading(true);
// // // // // //         try {
// // // // // //           await deleteDoc(doc(db, "items", id));
// // // // // //           message.success("Item deleted successfully");
// // // // // //           fetchData();
// // // // // //         } catch (error) {
// // // // // //           console.error("Error deleting item:", error);
// // // // // //           message.error("Failed to delete item. Please try again.");
// // // // // //         } finally {
// // // // // //           setLoading(false);
// // // // // //         }
// // // // // //       },
// // // // // //     });
// // // // // //   };

// // // // // //   const columns = [
// // // // // //     {
// // // // // //       title: "Item No",
// // // // // //       dataIndex: "itemNo",
// // // // // //       key: "itemNo",
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Item Name",
// // // // // //       dataIndex: "itemName",
// // // // // //       key: "itemName",
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Category",
// // // // // //       dataIndex: "categoryId",
// // // // // //       key: "categoryId",
// // // // // //       render: (categoryId) =>
// // // // // //         categories.find((c) => c.id === categoryId)?.categoryName || "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Company",
// // // // // //       dataIndex: "companyId",
// // // // // //       key: "companyId",
// // // // // //       render: (companyId) =>
// // // // // //         companies.find((c) => c.id === companyId)?.name || "N/A",
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Retail Price",
// // // // // //       dataIndex: "retailPrice",
// // // // // //       key: "retailPrice",
// // // // // //       render: (retailPrice) => `$${retailPrice.toFixed(2)}`,
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Trade Price",
// // // // // //       dataIndex: "tradePrice",
// // // // // //       key: "tradePrice",
// // // // // //       render: (tradePrice) => `$${tradePrice.toFixed(2)}`,
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Actions",
// // // // // //       key: "actions",
// // // // // //       render: (_, record) => (
// // // // // //         <Space>
// // // // // //           <Button
// // // // // //             icon={<EditOutlined />}
// // // // // //             onClick={() => showEditModal(record)}
// // // // // //           />
// // // // // //           <Button
// // // // // //             icon={<DeleteOutlined />}
// // // // // //             onClick={() => handleDelete(record.id)}
// // // // // //             danger
// // // // // //           />
// // // // // //         </Space>
// // // // // //       ),
// // // // // //     },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <Card style={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
// // // // // //       <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
// // // // // //         Edit Item Profile
// // // // // //       </Title>

// // // // // //       <Space style={{ marginBottom: 16 }}>
// // // // // //         <Input
// // // // // //           placeholder="Search items"
// // // // // //           value={searchText}
// // // // // //           onChange={(e) => setSearchText(e.target.value)}
// // // // // //           style={{ width: 200 }}
// // // // // //         />
// // // // // //         <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
// // // // // //           Search
// // // // // //         </Button>
// // // // // //       </Space>

// // // // // //       <Table
// // // // // //         dataSource={filteredItems}
// // // // // //         columns={columns}
// // // // // //         rowKey="id"
// // // // // //         loading={loading}
// // // // // //         scroll={{ x: true }}
// // // // // //       />

// // // // // //       <Modal
// // // // // //         title="Edit Item"
// // // // // //         visible={isModalVisible}
// // // // // //         onCancel={handleCancel}
// // // // // //         footer={null}
// // // // // //         width={800}
// // // // // //       >
// // // // // //         <Form
// // // // // //           form={form}
// // // // // //           name="edit_item_profile"
// // // // // //           onFinish={handleUpdate}
// // // // // //           layout="vertical"
// // // // // //         >
// // // // // //           <Space direction="vertical" size="middle" style={{ display: "flex" }}>
// // // // // //             <Row gutter={16}>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="itemNo"
// // // // // //                   label="Item No"
// // // // // //                   rules={[
// // // // // //                     {
// // // // // //                       required: true,
// // // // // //                       message: "Please input the item number!",
// // // // // //                     },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Input disabled />
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="itemName"
// // // // // //                   label="Item Name"
// // // // // //                   rules={[
// // // // // //                     { required: true, message: "Please input the item name!" },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Input />
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //             </Row>
// // // // // //             <Row gutter={16}>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="categoryId"
// // // // // //                   label="Category"
// // // // // //                   rules={[
// // // // // //                     { required: true, message: "Please select a category!" },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Select
// // // // // //                     showSearch
// // // // // //                     placeholder="Select a category"
// // // // // //                     optionFilterProp="children"
// // // // // //                     filterOption={(input, option) =>
// // // // // //                       option.children
// // // // // //                         .toLowerCase()
// // // // // //                         .includes(input.toLowerCase())
// // // // // //                     }
// // // // // //                   >
// // // // // //                     {categories.map((category) => (
// // // // // //                       <Option key={category.id} value={category.id}>
// // // // // //                         {category.categoryName}
// // // // // //                       </Option>
// // // // // //                     ))}
// // // // // //                   </Select>
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="companyId"
// // // // // //                   label="Company"
// // // // // //                   rules={[
// // // // // //                     { required: true, message: "Please select a company!" },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Select
// // // // // //                     showSearch
// // // // // //                     placeholder="Select a company"
// // // // // //                     optionFilterProp="children"
// // // // // //                     filterOption={(input, option) =>
// // // // // //                       option.children
// // // // // //                         .toLowerCase()
// // // // // //                         .includes(input.toLowerCase())
// // // // // //                     }
// // // // // //                   >
// // // // // //                     {companies.map((company) => (
// // // // // //                       <Option key={company.id} value={company.id}>
// // // // // //                         {company.name}
// // // // // //                       </Option>
// // // // // //                     ))}
// // // // // //                   </Select>
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //             </Row>
// // // // // //             <Row gutter={16}>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="distributorId"
// // // // // //                   label="Distributor"
// // // // // //                   rules={[
// // // // // //                     { required: true, message: "Please select a distributor!" },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Select
// // // // // //                     showSearch
// // // // // //                     placeholder="Select a distributor"
// // // // // //                     optionFilterProp="children"
// // // // // //                     filterOption={(input, option) =>
// // // // // //                       option.children
// // // // // //                         .toLowerCase()
// // // // // //                         .includes(input.toLowerCase())
// // // // // //                     }
// // // // // //                   >
// // // // // //                     {distributors.map((distributor) => (
// // // // // //                       <Option key={distributor.id} value={distributor.id}>
// // // // // //                         {distributor.name}
// // // // // //                       </Option>
// // // // // //                     ))}
// // // // // //                   </Select>
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="genericName"
// // // // // //                   label="Generic Name"
// // // // // //                   rules={[
// // // // // //                     {
// // // // // //                       required: true,
// // // // // //                       message: "Please input the generic name!",
// // // // // //                     },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Input />
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //             </Row>
// // // // // //             <Row gutter={16}>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="retailPrice"
// // // // // //                   label="Retail Price"
// // // // // //                   rules={[
// // // // // //                     {
// // // // // //                       required: true,
// // // // // //                       message: "Please input the retail price!",
// // // // // //                     },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <InputNumber
// // // // // //                     min={0}
// // // // // //                     step={0.01}
// // // // // //                     style={{ width: "100%" }}
// // // // // //                     formatter={(value) =>
// // // // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // // // //                     }
// // // // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // // // //                   />
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //               <Col span={12}>
// // // // // //                 <Form.Item
// // // // // //                   name="tradePrice"
// // // // // //                   label="Trade Price"
// // // // // //                   rules={[
// // // // // //                     {
// // // // // //                       required: true,
// // // // // //                       message: "Please input the trade price!",
// // // // // //                     },
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <InputNumber
// // // // // //                     min={0}
// // // // // //                     step={0.01}
// // // // // //                     style={{ width: "100%" }}
// // // // // //                     formatter={(value) =>
// // // // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // // // //                     }
// // // // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // // // //                   />
// // // // // //                 </Form.Item>
// // // // // //               </Col>
// // // // // //             </Row>
// // // // // //             <Form.Item>
// // // // // //               <Button type="primary" htmlType="submit" loading={loading} block>
// // // // // //                 Update Item
// // // // // //               </Button>
// // // // // //             </Form.Item>
// // // // // //           </Space>
// // // // // //         </Form>
// // // // // //       </Modal>
// // // // // //     </Card>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState, useEffect } from "react";
// // // // // import {
// // // // //   Form,
// // // // //   Input,
// // // // //   InputNumber,
// // // // //   Select,
// // // // //   Button,
// // // // //   Card,
// // // // //   Typography,
// // // // //   Space,
// // // // //   message,
// // // // //   Modal,
// // // // //   Table,
// // // // //   Row,
// // // // //   Col,
// // // // // } from "antd";
// // // // // import {
// // // // //   EditOutlined,
// // // // //   DeleteOutlined,
// // // // //   SearchOutlined,
// // // // // } from "@ant-design/icons";
// // // // // import {
// // // // //   collection,
// // // // //   getDocs,
// // // // //   doc,
// // // // //   updateDoc,
// // // // //   deleteDoc,
// // // // // } from "firebase/firestore";
// // // // // import { db } from "../../utilis/firebase";
// // // // // import debounce from "lodash/debounce";

// // // // // const { Title } = Typography;
// // // // // const { Option } = Select;

// // // // // export default function EditItemProfile() {
// // // // //   const [form] = Form.useForm();
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [items, setItems] = useState([]);
// // // // //   const [filteredItems, setFilteredItems] = useState([]);
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [companies, setCompanies] = useState([]);
// // // // //   const [distributors, setDistributors] = useState([]);
// // // // //   const [editingItem, setEditingItem] = useState(null);
// // // // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // // // //   const [searchText, setSearchText] = useState("");

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (searchText) {
// // // // //       debouncedSearch(searchText);
// // // // //     } else {
// // // // //       setFilteredItems(items);
// // // // //     }
// // // // //   }, [searchText, items]);

// // // // //   const fetchData = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const itemsSnapshot = await getDocs(collection(db, "items"));
// // // // //       const categoriesSnapshot = await getDocs(collection(db, "categories"));
// // // // //       const companiesSnapshot = await getDocs(collection(db, "companies"));
// // // // //       const distributorsSnapshot = await getDocs(collection(db, "distributors"));

// // // // //       const fetchedItems = itemsSnapshot.docs.map((doc) => ({
// // // // //         id: doc.id,
// // // // //         ...doc.data(),
// // // // //         retailPrice: doc.data().retailPrice || 0,
// // // // //         tradePrice: doc.data().tradePrice || 0,
// // // // //       }));

// // // // //       setItems(fetchedItems);
// // // // //       setFilteredItems(fetchedItems);
// // // // //       setCategories(
// // // // //         categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // //       );
// // // // //       setCompanies(
// // // // //         companiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // //       );
// // // // //       setDistributors(
// // // // //         distributorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// // // // //       );
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching data:", error);
// // // // //       message.error("Failed to load data. Please try again.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const debouncedSearch = debounce((search) => {
// // // // //     const lowerCaseSearch = search.toLowerCase();
// // // // //     const filtered = items.filter((item) =>
// // // // //       item.itemName.toLowerCase().includes(lowerCaseSearch)
// // // // //     );
// // // // //     setFilteredItems(filtered);
// // // // //   }, 300);

// // // // //   const showEditModal = (record) => {
// // // // //     setEditingItem(record);
// // // // //     form.setFieldsValue({
// // // // //       ...record,
// // // // //       retailPrice: parseFloat(record.retailPrice),  // Ensure the price is a float
// // // // //       tradePrice: parseFloat(record.tradePrice),    // Ensure the price is a float
// // // // //     });
// // // // //     setIsModalVisible(true);
// // // // //   };

// // // // //   const handleCancel = () => {
// // // // //     setIsModalVisible(false);
// // // // //     setEditingItem(null);
// // // // //     form.resetFields();
// // // // //   };

// // // // //   const handleUpdate = async (values) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const itemRef = doc(db, "items", editingItem.id);
// // // // //       const updatedItem = {
// // // // //         ...editingItem,
// // // // //         ...values,
// // // // //         retailPrice: parseFloat(values.retailPrice), // Make sure to parse as float
// // // // //         tradePrice: parseFloat(values.tradePrice),   // Make sure to parse as float
// // // // //       };
// // // // //       await updateDoc(itemRef, updatedItem);
// // // // //       message.success("Item updated successfully");
// // // // //       setIsModalVisible(false);
// // // // //       fetchData();
// // // // //     } catch (error) {
// // // // //       console.error("Error updating item:", error);
// // // // //       message.error("Failed to update item. Please try again.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDelete = async (id) => {
// // // // //     Modal.confirm({
// // // // //       title: "Are you sure you want to delete this item?",
// // // // //       content: "This action cannot be undone.",
// // // // //       onOk: async () => {
// // // // //         setLoading(true);
// // // // //         try {
// // // // //           await deleteDoc(doc(db, "items", id));
// // // // //           message.success("Item deleted successfully");
// // // // //           fetchData();
// // // // //         } catch (error) {
// // // // //           console.error("Error deleting item:", error);
// // // // //           message.error("Failed to delete item. Please try again.");
// // // // //         } finally {
// // // // //           setLoading(false);
// // // // //         }
// // // // //       },
// // // // //     });
// // // // //   };

// // // // //   const columns = [
// // // // //     {
// // // // //       title: "Item No",
// // // // //       dataIndex: "itemNo",
// // // // //       key: "itemNo",
// // // // //     },
// // // // //     {
// // // // //       title: "Item Name",
// // // // //       dataIndex: "itemName",
// // // // //       key: "itemName",
// // // // //     },
// // // // //     {
// // // // //       title: "Category",
// // // // //       dataIndex: "categoryId",
// // // // //       key: "categoryId",
// // // // //       render: (categoryId) =>
// // // // //         categories.find((c) => c.id === categoryId)?.categoryName || "N/A",
// // // // //     },
// // // // //     {
// // // // //       title: "Company",
// // // // //       dataIndex: "companyId",
// // // // //       key: "companyId",
// // // // //       render: (companyId) =>
// // // // //         companies.find((c) => c.id === companyId)?.name || "N/A",
// // // // //     },
// // // // //     {
// // // // //       title: "Retail Price",
// // // // //       dataIndex: "retailPrice",
// // // // //       key: "retailPrice",
// // // // //       render: (retailPrice) => `$${retailPrice.toFixed(2)}`,
// // // // //     },
// // // // //     {
// // // // //       title: "Trade Price",
// // // // //       dataIndex: "tradePrice",
// // // // //       key: "tradePrice",
// // // // //       render: (tradePrice) => `$${tradePrice.toFixed(2)}`,
// // // // //     },
// // // // //     {
// // // // //       title: "Actions",
// // // // //       key: "actions",
// // // // //       render: (_, record) => (
// // // // //         <Space>
// // // // //           <Button
// // // // //             icon={<EditOutlined />}
// // // // //             onClick={() => showEditModal(record)}
// // // // //           />
// // // // //           <Button
// // // // //             icon={<DeleteOutlined />}
// // // // //             onClick={() => handleDelete(record.id)}
// // // // //             danger
// // // // //           />
// // // // //         </Space>
// // // // //       ),
// // // // //     },
// // // // //   ];

// // // // //   return (
// // // // //     <Card style={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
// // // // //       <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
// // // // //         Edit Item Profile
// // // // //       </Title>

// // // // //       <Space style={{ marginBottom: 16 }}>
// // // // //         <Input
// // // // //           placeholder="Search items"
// // // // //           value={searchText}
// // // // //           onChange={(e) => setSearchText(e.target.value)}
// // // // //           style={{ width: 200 }}
// // // // //         />
// // // // //         <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
// // // // //           Search
// // // // //         </Button>
// // // // //       </Space>

// // // // //       <Table
// // // // //         dataSource={filteredItems}
// // // // //         columns={columns}
// // // // //         rowKey="id"
// // // // //         loading={loading}
// // // // //         scroll={{ x: true }}
// // // // //       />

// // // // //       <Modal
// // // // //         title="Edit Item"
// // // // //         visible={isModalVisible}
// // // // //         onCancel={handleCancel}
// // // // //         footer={null}
// // // // //         width={800}
// // // // //       >
// // // // //         <Form
// // // // //           form={form}
// // // // //           name="edit_item_profile"
// // // // //           onFinish={handleUpdate}
// // // // //           layout="vertical"
// // // // //         >
// // // // //           <Space direction="vertical" size="middle" style={{ display: "flex" }}>
// // // // //             <Row gutter={16}>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="itemNo"
// // // // //                   label="Item No"
// // // // //                   rules={[{ required: true, message: "Please input the item number!" }]}
// // // // //                 >
// // // // //                   <Input disabled />
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="itemName"
// // // // //                   label="Item Name"
// // // // //                   rules={[{ required: true, message: "Please input the item name!" }]}
// // // // //                 >
// // // // //                   <Input />
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //             </Row>
// // // // //             <Row gutter={16}>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="categoryId"
// // // // //                   label="Category"
// // // // //                   rules={[{ required: true, message: "Please select a category!" }]}
// // // // //                 >
// // // // //                   <Select
// // // // //                     showSearch
// // // // //                     placeholder="Select a category"
// // // // //                     optionFilterProp="children"
// // // // //                     filterOption={(input, option) =>
// // // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // // //                     }
// // // // //                   >
// // // // //                     {categories.map((category) => (
// // // // //                       <Option key={category.id} value={category.id}>
// // // // //                         {category.categoryName}
// // // // //                       </Option>
// // // // //                     ))}
// // // // //                   </Select>
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="companyId"
// // // // //                   label="Company"
// // // // //                   rules={[{ required: true, message: "Please select a company!" }]}
// // // // //                 >
// // // // //                   <Select
// // // // //                     showSearch
// // // // //                     placeholder="Select a company"
// // // // //                     optionFilterProp="children"
// // // // //                     filterOption={(input, option) =>
// // // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // // //                     }
// // // // //                   >
// // // // //                     {companies.map((company) => (
// // // // //                       <Option key={company.id} value={company.id}>
// // // // //                         {company.name}
// // // // //                       </Option>
// // // // //                     ))}
// // // // //                   </Select>
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //             </Row>
// // // // //             <Row gutter={16}>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="distributorId"
// // // // //                   label="Distributor"
// // // // //                   rules={[{ required: true, message: "Please select a distributor!" }]}
// // // // //                 >
// // // // //                   <Select
// // // // //                     showSearch
// // // // //                     placeholder="Select a distributor"
// // // // //                     optionFilterProp="children"
// // // // //                     filterOption={(input, option) =>
// // // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // // //                     }
// // // // //                   >
// // // // //                     {distributors.map((distributor) => (
// // // // //                       <Option key={distributor.id} value={distributor.id}>
// // // // //                         {distributor.name}
// // // // //                       </Option>
// // // // //                     ))}
// // // // //                   </Select>
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 {/* <Form.Item
// // // // //                   name="genericName"
// // // // //                   label="Generic Name"
// // // // //                   rules={[{ required: true, message: "Please input the generic name!" }]}
// // // // //                 >
// // // // //                   <Input />
// // // // //                 </Form.Item> */}
// // // // //               </Col>
// // // // //             </Row>
// // // // //             <Row gutter={16}>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="retailPrice"
// // // // //                   label="Retail Price"
// // // // //                   rules={[{ required: true, message: "Please input the retail price!" }]}
// // // // //                 >
// // // // //                   <InputNumber
// // // // //                     min={0}
// // // // //                     step={0.01}
// // // // //                     style={{ width: "100%" }}
// // // // //                     formatter={(value) =>
// // // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // // //                     }
// // // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // // //                   />
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //               <Col span={12}>
// // // // //                 <Form.Item
// // // // //                   name="tradePrice"
// // // // //                   label="Trade Price"
// // // // //                   rules={[{ required: true, message: "Please input the trade price!" }]}
// // // // //                 >
// // // // //                   <InputNumber
// // // // //                     min={0}
// // // // //                     step={0.01}
// // // // //                     style={{ width: "100%" }}
// // // // //                     formatter={(value) =>
// // // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // // //                     }
// // // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // // //                   />
// // // // //                 </Form.Item>
// // // // //               </Col>
// // // // //             </Row>
// // // // //             <Form.Item>
// // // // //               <Button type="primary" htmlType="submit" loading={loading} block>
// // // // //                 Update Item
// // // // //               </Button>
// // // // //             </Form.Item>
// // // // //           </Space>
// // // // //         </Form>
// // // // //       </Modal>
// // // // //     </Card>
// // // // //   );
// // // // // }


// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Form,
// // // //   Input,
// // // //   InputNumber,
// // // //   Select,
// // // //   Button,
// // // //   Card,
// // // //   Typography,
// // // //   Space,
// // // //   message,
// // // //   Modal,
// // // //   Table,
// // // //   Row,
// // // //   Col,
// // // // } from "antd";
// // // // import {
// // // //   EditOutlined,
// // // //   DeleteOutlined,
// // // //   SearchOutlined,
// // // // } from "@ant-design/icons";
// // // // import {
// // // //   collection,
// // // //   getDocs,
// // // //   doc,
// // // //   updateDoc,
// // // //   deleteDoc,
// // // // } from "firebase/firestore";
// // // // import { db } from "../../utilis/firebase";
// // // // import debounce from "lodash/debounce";

// // // // const { Title } = Typography;
// // // // const { Option } = Select;

// // // // export default function EditItemProfile() {
// // // //   const [form] = Form.useForm();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [items, setItems] = useState([]);
// // // //   const [filteredItems, setFilteredItems] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [companies, setCompanies] = useState([]);
// // // //   const [distributors, setDistributors] = useState([]);
// // // //   const [editingItem, setEditingItem] = useState(null);
// // // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // // //   const [searchText, setSearchText] = useState("");

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (searchText) {
// // // //       debouncedSearch(searchText);
// // // //     } else {
// // // //       setFilteredItems(items);
// // // //     }
// // // //   }, [searchText, items]);

// // // //   const fetchData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const itemsSnapshot = await getDocs(collection(db, "items"));
// // // //       const categoriesSnapshot = await getDocs(collection(db, "categories"));
// // // //       const companiesSnapshot = await getDocs(collection(db, "companies"));
// // // //       const distributorsSnapshot = await getDocs(collection(db, "distributors"));

// // // //       const fetchedItems = itemsSnapshot.docs.map((doc) => ({
// // // //         id: doc.id,
// // // //         ...doc.data(),
// // // //         retailPrice: doc.data().retailPrice || 0,
// // // //         tradePrice: doc.data().tradePrice || 0,
// // // //       }));

// // // //       setItems(fetchedItems);
// // // //       setFilteredItems(fetchedItems);
// // // //       setCategories(categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // // //       setCompanies(companiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // // //       setDistributors(distributorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // // //     } catch (error) {
// // // //       console.error("Error fetching data:", error);
// // // //       message.error("Failed to load data. Please try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const debouncedSearch = debounce((search) => {
// // // //     const lowerCaseSearch = search.toLowerCase();
// // // //     const filtered = items.filter((item) =>
// // // //       item.itemName.toLowerCase().includes(lowerCaseSearch)
// // // //     );
// // // //     setFilteredItems(filtered);
// // // //   }, 300);

// // // //   const showEditModal = (record) => {
// // // //     setEditingItem(record);
// // // //     form.setFieldsValue({
// // // //       ...record,
// // // //       retailPrice: parseFloat(record.retailPrice),
// // // //       tradePrice: parseFloat(record.tradePrice),
// // // //     });
// // // //     setIsModalVisible(true);
// // // //   };

// // // //   const handleCancel = () => {
// // // //     setIsModalVisible(false);
// // // //     setEditingItem(null);
// // // //     form.resetFields();
// // // //   };

// // // //   const handleUpdate = async (values) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const itemRef = doc(db, "items", editingItem.id);
// // // //       const updatedItem = {
// // // //         ...editingItem,
// // // //         ...values,
// // // //         retailPrice: parseFloat(values.retailPrice),
// // // //         tradePrice: parseFloat(values.tradePrice),
// // // //       };
// // // //       await updateDoc(itemRef, updatedItem);
// // // //       message.success("Item updated successfully");
// // // //       setIsModalVisible(false);
// // // //       fetchData();
// // // //     } catch (error) {
// // // //       console.error("Error updating item:", error);
// // // //       message.error("Failed to update item. Please try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     Modal.confirm({
// // // //       title: "Are you sure you want to delete this item?",
// // // //       content: "This action cannot be undone.",
// // // //       onOk: async () => {
// // // //         setLoading(true);
// // // //         try {
// // // //           await deleteDoc(doc(db, "items", id));
// // // //           message.success("Item deleted successfully");
// // // //           fetchData();
// // // //         } catch (error) {
// // // //           console.error("Error deleting item:", error);
// // // //           message.error("Failed to delete item. Please try again.");
// // // //         } finally {
// // // //           setLoading(false);
// // // //         }
// // // //       },
// // // //     });
// // // //   };

// // // //   const columns = [
// // // //     {
// // // //       title: "Item No",
// // // //       dataIndex: "itemNo",
// // // //       key: "itemNo",
// // // //     },
// // // //     {
// // // //       title: "Item Name",
// // // //       dataIndex: "itemName",
// // // //       key: "itemName",
// // // //     },
// // // //     {
// // // //       title: "Category",
// // // //       dataIndex: "categoryId",
// // // //       key: "categoryId",
// // // //       render: (categoryId) =>
// // // //         categories.find((c) => c.id === categoryId)?.categoryName || "N/A",
// // // //     },
// // // //     {
// // // //       title: "Company",
// // // //       dataIndex: "companyId",
// // // //       key: "companyId",
// // // //       render: (companyId) =>
// // // //         companies.find((c) => c.id === companyId)?.name || "N/A",
// // // //     },
// // // //     {
// // // //       title: "Actual Retail Price",
// // // //       dataIndex: "retailPrice",
// // // //       key: "retailPrice",
// // // //       render: (retailPrice) => `$${retailPrice.toFixed(2)}`,
// // // //     },
// // // //     {
// // // //       title: "Actual Trade Price",
// // // //       dataIndex: "tradePrice",
// // // //       key: "tradePrice",
// // // //       render: (tradePrice) => `$${tradePrice.toFixed(2)}`,
// // // //     },
// // // //     {
// // // //       title: "Actions",
// // // //       key: "actions",
// // // //       render: (_, record) => (
// // // //         <Space>
// // // //           <Button
// // // //             icon={<EditOutlined />}
// // // //             onClick={() => showEditModal(record)}
// // // //           />
// // // //           <Button
// // // //             icon={<DeleteOutlined />}
// // // //             onClick={() => handleDelete(record.id)}
// // // //             danger
// // // //           />
// // // //         </Space>
// // // //       ),
// // // //     },
// // // //   ];

// // // //   return (
// // // //     <Card style={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
// // // //       <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
// // // //         Edit Item Profile
// // // //       </Title>

// // // //       <Space style={{ marginBottom: 16 }}>
// // // //         <Input
// // // //           placeholder="Search items"
// // // //           value={searchText}
// // // //           onChange={(e) => setSearchText(e.target.value)}
// // // //           style={{ width: 200 }}
// // // //         />
// // // //         <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
// // // //           Search
// // // //         </Button>
// // // //       </Space>

// // // //       <Table
// // // //         dataSource={filteredItems}
// // // //         columns={columns}
// // // //         rowKey="id"
// // // //         loading={loading}
// // // //         scroll={{ x: true }}
// // // //       />

// // // //       <Modal
// // // //         title="Edit Item"
// // // //         visible={isModalVisible}
// // // //         onCancel={handleCancel}
// // // //         footer={null}
// // // //         width={800}
// // // //       >
// // // //         <Form
// // // //           form={form}
// // // //           name="edit_item_profile"
// // // //           onFinish={handleUpdate}
// // // //           layout="vertical"
// // // //         >
// // // //           <Space direction="vertical" size="middle" style={{ display: "flex" }}>
// // // //             <Row gutter={16}>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="itemNo"
// // // //                   label="Item No"
// // // //                   rules={[{ required: true, message: "Please input the item number!" }]}
// // // //                 >
// // // //                   <Input disabled />
// // // //                 </Form.Item>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="itemName"
// // // //                   label="Item Name"
// // // //                   rules={[{ required: true, message: "Please input the item name!" }]}
// // // //                 >
// // // //                   <Input />
// // // //                 </Form.Item>
// // // //               </Col>
// // // //             </Row>
// // // //             <Row gutter={16}>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="categoryId"
// // // //                   label="Category"
// // // //                   rules={[{ required: true, message: "Please select a category!" }]}
// // // //                 >
// // // //                   <Select
// // // //                     showSearch
// // // //                     placeholder="Select a category"
// // // //                     optionFilterProp="children"
// // // //                     filterOption={(input, option) =>
// // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // //                     }
// // // //                   >
// // // //                     {categories.map((category) => (
// // // //                       <Option key={category.id} value={category.id}>
// // // //                         {category.categoryName}
// // // //                       </Option>
// // // //                     ))}
// // // //                   </Select>
// // // //                 </Form.Item>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="companyId"
// // // //                   label="Company"
// // // //                   rules={[{ required: true, message: "Please select a company!" }]}
// // // //                 >
// // // //                   <Select
// // // //                     showSearch
// // // //                     placeholder="Select a company"
// // // //                     optionFilterProp="children"
// // // //                     filterOption={(input, option) =>
// // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // //                     }
// // // //                   >
// // // //                     {companies.map((company) => (
// // // //                       <Option key={company.id} value={company.id}>
// // // //                         {company.name}
// // // //                       </Option>
// // // //                     ))}
// // // //                   </Select>
// // // //                 </Form.Item>
// // // //               </Col>
// // // //             </Row>
// // // //             <Row gutter={16}>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="distributorId"
// // // //                   label="Distributor"
// // // //                   rules={[{ required: true, message: "Please select a distributor!" }]}
// // // //                 >
// // // //                   <Select
// // // //                     showSearch
// // // //                     placeholder="Select a distributor"
// // // //                     optionFilterProp="children"
// // // //                     filterOption={(input, option) =>
// // // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // // //                     }
// // // //                   >
// // // //                     {distributors.map((distributor) => (
// // // //                       <Option key={distributor.id} value={distributor.id}>
// // // //                         {distributor.name}
// // // //                       </Option>
// // // //                     ))}
// // // //                   </Select>
// // // //                 </Form.Item>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 {/* Uncomment if needed */}
// // // //                 {/* <Form.Item
// // // //                   name="genericName"
// // // //                   label="Generic Name"
// // // //                   rules={[{ required: true, message: "Please input the generic name!" }]}
// // // //                 >
// // // //                   <Input />
// // // //                 </Form.Item> */}
// // // //               </Col>
// // // //             </Row>
// // // //             <Row gutter={16}>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="retailPrice"
// // // //                   label="Retail Price"
// // // //                   rules={[{ required: true, message: "Please input the retail price!" }]}
// // // //                 >
// // // //                   <InputNumber
// // // //                     min={0}
// // // //                     step={0.01}
// // // //                     style={{ width: "100%" }}
// // // //                     formatter={(value) =>
// // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // //                     }
// // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // //                   />
// // // //                 </Form.Item>
// // // //               </Col>
// // // //               <Col span={12}>
// // // //                 <Form.Item
// // // //                   name="tradePrice"
// // // //                   label="Trade Price"
// // // //                   rules={[{ required: true, message: "Please input the trade price!" }]}
// // // //                 >
// // // //                   <InputNumber
// // // //                     min={0}
// // // //                     step={0.01}
// // // //                     style={{ width: "100%" }}
// // // //                     formatter={(value) =>
// // // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // // //                     }
// // // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // // //                   />
// // // //                 </Form.Item>
// // // //               </Col>
// // // //             </Row>
// // // //             <Form.Item>
// // // //               <Button type="primary" htmlType="submit" loading={loading} block>
// // // //                 Update Item
// // // //               </Button>
// // // //             </Form.Item>
// // // //           </Space>
// // // //         </Form>
// // // //       </Modal>
// // // //     </Card>
// // // //   );
// // // // }


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Form,
// // //   Input,
// // //   InputNumber,
// // //   Select,
// // //   Button,
// // //   Card,
// // //   Typography,
// // //   Space,
// // //   message,
// // //   Modal,
// // //   Table,
// // //   Row,
// // //   Col,
// // // } from "antd";
// // // import {
// // //   EditOutlined,
// // //   DeleteOutlined,
// // //   SearchOutlined,
// // // } from "@ant-design/icons";
// // // import {
// // //   collection,
// // //   getDocs,
// // //   doc,
// // //   updateDoc,
// // //   deleteDoc,
// // // } from "firebase/firestore";
// // // import { db } from "../../utilis/firebase";
// // // import debounce from "lodash/debounce";

// // // const { Title } = Typography;
// // // const { Option } = Select;

// // // export default function EditItemProfile() {
// // //   const [form] = Form.useForm();
// // //   const [loading, setLoading] = useState(false);
// // //   const [items, setItems] = useState([]);
// // //   const [filteredItems, setFilteredItems] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [companies, setCompanies] = useState([]);
// // //   const [distributors, setDistributors] = useState([]);
// // //   const [editingItem, setEditingItem] = useState(null);
// // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // //   const [searchText, setSearchText] = useState("");

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (searchText) {
// // //       debouncedSearch(searchText);
// // //     } else {
// // //       setFilteredItems(items);
// // //     }
// // //   }, [searchText, items]);

// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const itemsSnapshot = await getDocs(collection(db, "items"));
// // //       const categoriesSnapshot = await getDocs(collection(db, "categories"));
// // //       const companiesSnapshot = await getDocs(collection(db, "companies"));
// // //       const distributorsSnapshot = await getDocs(collection(db, "distributors"));

// // //       const fetchedItems = itemsSnapshot.docs.map((doc) => ({
// // //         id: doc.id,
// // //         ...doc.data(),
// // //         retailPrice: doc.data().retailPrice || 0,
// // //         tradePrice: doc.data().tradePrice || 0,
// // //       }));

// // //       setItems(fetchedItems);
// // //       setFilteredItems(fetchedItems);
// // //       setCategories(categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // //       setCompanies(companiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // //       setDistributors(distributorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// // //     } catch (error) {
// // //       console.error("Error fetching data:", error);
// // //       message.error("Failed to load data. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const debouncedSearch = debounce((search) => {
// // //     const lowerCaseSearch = search.toLowerCase();
// // //     const filtered = items.filter((item) =>
// // //       item.itemName.toLowerCase().includes(lowerCaseSearch)
// // //     );
// // //     setFilteredItems(filtered);
// // //   }, 300);

// // //   const showEditModal = (record) => {
// // //     setEditingItem(record);
// // //     form.setFieldsValue({
// // //       ...record,
// // //       retailPrice: parseFloat(record.retailPrice),
// // //       tradePrice: parseFloat(record.tradePrice),
// // //     });
// // //     setIsModalVisible(true);
// // //   };

// // //   const handleCancel = () => {
// // //     setIsModalVisible(false);
// // //     setEditingItem(null);
// // //     form.resetFields();
// // //   };

// // //   const handleUpdate = async (values) => {
// // //     setLoading(true);
// // //     try {
// // //       const itemRef = doc(db, "items", editingItem.id);
// // //       const updatedItem = {
// // //         ...editingItem,
// // //         ...values,
// // //         retailPrice: parseFloat(values.retailPrice),
// // //         tradePrice: parseFloat(values.tradePrice),
// // //       };
// // //       await updateDoc(itemRef, updatedItem);
// // //       message.success("Item updated successfully");
// // //       setIsModalVisible(false);
// // //       fetchData();
// // //     } catch (error) {
// // //       console.error("Error updating item:", error);
// // //       message.error("Failed to update item. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     Modal.confirm({
// // //       title: "Are you sure you want to delete this item?",
// // //       content: "This action cannot be undone.",
// // //       onOk: async () => {
// // //         setLoading(true);
// // //         try {
// // //           await deleteDoc(doc(db, "items", id));
// // //           message.success("Item deleted successfully");
// // //           fetchData();
// // //         } catch (error) {
// // //           console.error("Error deleting item:", error);
// // //           message.error("Failed to delete item. Please try again.");
// // //         } finally {
// // //           setLoading(false);
// // //         }
// // //       },
// // //     });
// // //   };

// // //   const handleQuantityChange = (key, field, value) => {
// // //     const updatedItems = filteredItems.map(item => {
// // //       if (item.id === key) {
// // //         return { ...item, [field]: value };
// // //       }
// // //       return item;
// // //     });
// // //     setFilteredItems(updatedItems);
// // //   };

// // //   const columns = [
// // //     {
// // //       title: "Item No",
// // //       dataIndex: "itemNo",
// // //       key: "itemNo",
// // //     },
// // //     {
// // //       title: "Item Name",
// // //       dataIndex: "itemName",
// // //       key: "itemName",
// // //     },
// // //     {
// // //       title: "Category",
// // //       dataIndex: "categoryId",
// // //       key: "categoryId",
// // //       render: (categoryId) =>
// // //         categories.find((c) => c.id === categoryId)?.categoryName || "N/A",
// // //     },
// // //     {
// // //       title: "Company",
// // //       dataIndex: "companyId",
// // //       key: "companyId",
// // //       render: (companyId) =>
// // //         companies.find((c) => c.id === companyId)?.name || "N/A",
// // //     },
// // //     {
// // //       title: "Retail Price",
// // //       dataIndex: "retailPrice",
// // //       key: "retailPrice",
// // //       render: (_, record) => (
// // //         <InputNumber
// // //           value={record.retailPrice}
// // //           onChange={(value) => handleQuantityChange(record.id, 'retailPrice', value)}
// // //           formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// // //           parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "Trade Price",
// // //       dataIndex: "tradePrice",
// // //       key: "tradePrice",
// // //       render: (_, record) => (
// // //         <InputNumber
// // //           value={record.tradePrice}
// // //           onChange={(value) => handleQuantityChange(record.id, 'tradePrice', value)}
// // //           formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
// // //           parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "Actions",
// // //       key: "actions",
// // //       render: (_, record) => (
// // //         <Space>
// // //           <Button
// // //             icon={<EditOutlined />}
// // //             onClick={() => showEditModal(record)}
// // //           />
// // //           <Button
// // //             icon={<DeleteOutlined />}
// // //             onClick={() => handleDelete(record.id)}
// // //             danger
// // //           />
// // //         </Space>
// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <Card style={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
// // //       <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
// // //         Edit Item Profile
// // //       </Title>

// // //       <Space style={{ marginBottom: 16 }}>
// // //         <Input
// // //           placeholder="Search items"
// // //           value={searchText}
// // //           onChange={(e) => setSearchText(e.target.value)}
// // //           style={{ width: 200 }}
// // //         />
// // //         <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
// // //           Search
// // //         </Button>
// // //       </Space>

// // //       <Table
// // //         dataSource={filteredItems}
// // //         columns={columns}
// // //         rowKey="id"
// // //         loading={loading}
// // //         scroll={{ x: true }}
// // //       />

// // //       <Modal
// // //         title="Edit Item"
// // //         visible={isModalVisible}
// // //         onCancel={handleCancel}
// // //         footer={null}
// // //         width={800}
// // //       >
// // //         <Form
// // //           form={form}
// // //           name="edit_item_profile"
// // //           onFinish={handleUpdate}
// // //           layout="vertical"
// // //         >
// // //           <Space direction="vertical" size="middle" style={{ display: "flex" }}>
// // //             <Row gutter={16}>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="itemNo"
// // //                   label="Item No"
// // //                   rules={[{ required: true, message: "Please input the item number!" }]}
// // //                 >
// // //                   <Input disabled />
// // //                 </Form.Item>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="itemName"
// // //                   label="Item Name"
// // //                   rules={[{ required: true, message: "Please input the item name!" }]}
// // //                 >
// // //                   <Input />
// // //                 </Form.Item>
// // //               </Col>
// // //             </Row>
// // //             <Row gutter={16}>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="categoryId"
// // //                   label="Category"
// // //                   rules={[{ required: true, message: "Please select a category!" }]}
// // //                 >
// // //                   <Select
// // //                     showSearch
// // //                     placeholder="Select a category"
// // //                     optionFilterProp="children"
// // //                     filterOption={(input, option) =>
// // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // //                     }
// // //                   >
// // //                     {categories.map((category) => (
// // //                       <Option key={category.id} value={category.id}>
// // //                         {category.categoryName}
// // //                       </Option>
// // //                     ))}
// // //                   </Select>
// // //                 </Form.Item>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="companyId"
// // //                   label="Company"
// // //                   rules={[{ required: true, message: "Please select a company!" }]}
// // //                 >
// // //                   <Select
// // //                     showSearch
// // //                     placeholder="Select a company"
// // //                     optionFilterProp="children"
// // //                     filterOption={(input, option) =>
// // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // //                     }
// // //                   >
// // //                     {companies.map((company) => (
// // //                       <Option key={company.id} value={company.id}>
// // //                         {company.name}
// // //                       </Option>
// // //                     ))}
// // //                   </Select>
// // //                 </Form.Item>
// // //               </Col>
// // //             </Row>
// // //             <Row gutter={16}>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="distributorId"
// // //                   label="Distributor"
// // //                   rules={[{ required: true, message: "Please select a distributor!" }]}
// // //                 >
// // //                   <Select
// // //                     showSearch
// // //                     placeholder="Select a distributor"
// // //                     optionFilterProp="children"
// // //                     filterOption={(input, option) =>
// // //                       option.children.toLowerCase().includes(input.toLowerCase())
// // //                     }
// // //                   >
// // //                     {distributors.map((distributor) => (
// // //                       <Option key={distributor.id} value={distributor.id}>
// // //                         {distributor.name}
// // //                       </Option>
// // //                     ))}
// // //                   </Select>
// // //                 </Form.Item>
// // //               </Col>
// // //               <Col span={12}>
// // //                 {/* Uncomment if needed */}
// // //                 {/* <Form.Item
// // //                   name="genericName"
// // //                   label="Generic Name"
// // //                   rules={[{ required: true, message: "Please input the generic name!" }]}
// // //                 >
// // //                   <Input />
// // //                 </Form.Item> */}
// // //               </Col>
// // //             </Row>
// // //             <Row gutter={16}>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="retailPrice"
// // //                   label="Retail Price"
// // //                   rules={[{ required: true, message: "Please input the retail price!" }]}
// // //                 >
// // //                   <InputNumber
// // //                     min={0}
// // //                     step={0.01}
// // //                     style={{ width: "100%" }}
// // //                     formatter={(value) =>
// // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // //                     }
// // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // //                   />
// // //                 </Form.Item>
// // //               </Col>
// // //               <Col span={12}>
// // //                 <Form.Item
// // //                   name="tradePrice"
// // //                   label="Trade Price"
// // //                   rules={[{ required: true, message: "Please input the trade price!" }]}
// // //                 >
// // //                   <InputNumber
// // //                     min={0}
// // //                     step={0.01}
// // //                     style={{ width: "100%" }}
// // //                     formatter={(value) =>
// // //                       `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// // //                     }
// // //                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
// // //                   />
// // //                 </Form.Item>
// // //               </Col>
// // //             </Row>
// // //             <Form.Item>
// // //               <Button type="primary" htmlType="submit" loading={loading} block>
// // //                 Update Item
// // //               </Button>
// // //             </Form.Item>
// // //           </Space>
// // //         </Form>
// // //       </Modal>
// // //     </Card>
// // //   );
// // // }



// // import React, { useState, useEffect } from 'react';
// // import {
// //   Table,
// //   Input,
// //   Button,
// //   Modal,
// //   Form,
// //   InputNumber,
// //   Space,
// //   message,
// //   Typography,
// //   Spin,
// // } from 'antd';
// // import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config
// // import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// // const { Title } = Typography;

// // export default function ItemManagement() {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [form] = Form.useForm();

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       setLoading(true);
// //       try {
// //         const itemsSnapshot = await getDocs(collection(db, 'items'));
// //         const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setItems(itemsData);
// //       } catch (error) {
// //         console.error('Error fetching items:', error);
// //         message.error('Failed to load items. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchItems();
// //   }, []);

// //   const handleSearch = (value) => {
// //     setSearchTerm(value);
// //   };

// //   const openEditModal = (item) => {
// //     setEditingItem(item);
// //     form.setFieldsValue(item);
// //   };

// //   const handleUpdate = async (values) => {
// //     if (!editingItem) return;
// //     const itemRef = doc(db, 'items', editingItem.id);
// //     try {
// //       await updateDoc(itemRef, values);
// //       message.success('Item updated successfully');
// //       setItems(prevItems => 
// //         prevItems.map(item => (item.id === editingItem.id ? { ...item, ...values } : item))
// //       );
// //       setEditingItem(null);
// //       form.resetFields();
// //     } catch (error) {
// //       console.error('Error updating item:', error);
// //       message.error('Failed to update item. Please try again.');
// //     }
// //   };

// //   const filteredItems = items.filter(item =>
// //     item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <Title level={2}>Item Management</Title>
// //       <Input.Search
// //         placeholder="Search by item name"
// //         onSearch={handleSearch}
// //         style={{ marginBottom: '20px' }}
// //       />
// //       {loading ? (
// //         <Spin />
// //       ) : (
// //         <Table
// //           dataSource={filteredItems}
// //           rowKey="id"
// //           pagination={{ pageSize: 10 }}
// //           columns={[
// //             { title: 'Item No', dataIndex: 'itemNo', key: 'itemNo' },
// //             { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
// //             { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
// //             { title: 'Actions', key: 'actions', render: (_, item) => (
// //                 <Button onClick={() => openEditModal(item)}>Edit</Button>
// //               )
// //             }
// //           ]}
// //         />
// //       )}

// //       <Modal
// //         title="Edit Item"
// //         visible={!!editingItem}
// //         onCancel={() => {
// //           setEditingItem(null);
// //           form.resetFields();
// //         }}
// //         footer={null}
// //       >
// //         <Form
// //           form={form}
// //           layout="vertical"
// //           onFinish={handleUpdate}
// //         >
// //           <Form.Item name="itemName" label="Item Name">
// //             <Input />
// //           </Form.Item>
// //           <Form.Item name="itemNo" label="Item No">
// //             <InputNumber min={0} disabled />
// //           </Form.Item>
// //           <Form.Item name="packRetailPrice" label="Pack Retail Price">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="packingType" label="Packing Type">
// //             <Input />
// //           </Form.Item>
// //           <Form.Item name="quantity" label="Quantity">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="quantityNeeded" label="Quantity Needed">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="stock" label="Stock">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="stripsInPack" label="Strips in Pack">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="tpRate" label="TP Rate">
// //             <InputNumber min={0} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="unitsInPack" label="Units in Pack">
// //             <InputNumber min={1} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item name="unitsInStrip" label="Units in Strip">
// //             <InputNumber min={1} style={{ width: '100%' }} />
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit">
// //               Update Item
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   Input,
//   Button,
//   Modal,
//   Form,
//   InputNumber,
//   Space,
//   message,
//   Typography,
//   Spin,
// } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config
// import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// import { DeleteOutlined } from '@ant-design/icons';

// const { Title } = Typography;

// export default function ItemManagement() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingItem, setEditingItem] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const itemsSnapshot = await getDocs(collection(db, 'items'));
//         const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setItems(itemsData);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//         message.error('Failed to load items. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

//   const openEditModal = (item) => {
//     setEditingItem(item);
//     form.setFieldsValue(item);
//   };

//   const handleUpdate = async (values) => {
//     if (!editingItem) return;
//     const itemRef = doc(db, 'items', editingItem.id);
//     try {
//       await updateDoc(itemRef, values);
//       message.success('Item updated successfully');
//       setItems(prevItems =>
//         prevItems.map(item => (item.id === editingItem.id ? { ...item, ...values } : item))
//       );
//       setEditingItem(null);
//       form.resetFields();
//     } catch (error) {
//       console.error('Error updating item:', error);
//       message.error('Failed to update item. Please try again.');
//     }
//   };

//   const handleDelete = (itemId) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this item?',
//       okText: 'Yes',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk: async () => {
//         try {
//           await deleteDoc(doc(db, 'items', itemId));
//           setItems(prevItems => prevItems.filter(item => item.id !== itemId));
//           message.success('Item deleted successfully');
//         } catch (error) {
//           console.error('Error deleting item:', error);
//           message.error('Failed to delete item. Please try again.');
//         }
//       },
//     });
//   };

//   const filteredItems = items.filter(item =>
//     item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ padding: '20px' }}>
//       <Title level={2}>Item Management</Title>
//       <Input.Search
//         placeholder="Search by item name"
//         onSearch={handleSearch}
//         style={{ marginBottom: '20px' }}
//       />
//       {loading ? (
//         <Spin />
//       ) : (
//         <Table
//           dataSource={filteredItems}
//           rowKey="id"
//           pagination={{ pageSize: 10 }}
//           columns={[
//             { title: 'Item No', dataIndex: 'itemNo', key: 'itemNo' },
//             { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
//             { title: 'Stock', dataIndex: 'stock', key: 'stock' },
//             { title: 'Stock in Units', dataIndex: 'stockofunits', key: 'stockofunits'},
//             {
//               title: 'Actions',
//               key: 'actions',
//               render: (_, item) => (
//                 <Space>
//                   <Button onClick={() => openEditModal(item)}>Edit</Button>
//                   <Button 
//                   type="primary"
//                   danger
//                   icon={<DeleteOutlined/>}
//                   size="small"
//                    onClick={() => handleDelete(item.id)}>
//                     Delete
//                   </Button>
//                 </Space>
//               ),
//             },
//           ]}
//         />
//       )}

//       <Modal
//         title="Edit Item"
//         visible={!!editingItem}
//         onCancel={() => {
//           setEditingItem(null);
//           form.resetFields();
//         }}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleUpdate}
//         >
//           <Form.Item name="itemName" label="Item Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="itemNo" label="Item No">
//             <InputNumber min={0} disabled />
//           </Form.Item>
//           <Form.Item name="packRetailPrice" label="Pack Retail Price">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="packingType" label="Packing Type">
//             <Input />
//           </Form.Item>
//           {/* <Form.Item name="quantity" label="Quantity">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item> */}
//           <Form.Item name="minimumquantity" label="Minimum Quantity">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="stock" label="Stock">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="stripsInPack" label="Strips in Pack">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="tpRate" label="TP Rate">
//             <InputNumber min={0} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="unitsInPack" label="Units in Pack">
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item name="unitsInStrip" label="Units in Strip">
//             <InputNumber min={1} style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update Item
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }
// // 


import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Space,
  message,
  Typography,
  Spin,
  DatePicker,
} from 'antd';
import { db } from '../../utilis/firebase'; // Adjust this import based on your Firebase config
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

export default function ItemManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsSnapshot = await getDocs(collection(db, 'items'));
        const itemsData = itemsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            manufacturingDate: data.manufacturingDate ? data.manufacturingDate.toDate() : null,
            expiryDate: data.expiryDate ? data.expiryDate.toDate() : null,
          };
        });
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
        message.error('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      ...item,
      manufacturingDate: item.manufacturingDate ? moment(item.manufacturingDate) : null,
      expiryDate: item.expiryDate ? moment(item.expiryDate) : null,
    });
  };

  const handleUpdate = async (values) => {
    if (!editingItem) return;
    const itemRef = doc(db, 'items', editingItem.id);
    try {
      await updateDoc(itemRef, {
        ...values,
        manufacturingDate: values.manufacturingDate.toDate(),
        expiryDate: values.expiryDate.toDate(),
      });
      message.success('Item updated successfully');
      setItems(prevItems =>
        prevItems.map(item => (item.id === editingItem.id ? { ...item, ...values } : item))
      );
      setEditingItem(null);
      form.resetFields();
    } catch (error) {
      console.error('Error updating item:', error);
      message.error('Failed to update item. Please try again.');
    }
  };

  const handleDelete = (itemId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'items', itemId));
          setItems(prevItems => prevItems.filter(item => item.id !== itemId));
          message.success('Item deleted successfully');
        } catch (error) {
          console.error('Error deleting item:', error);
          message.error('Failed to delete item. Please try again.');
        }
      },
    });
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Item Management</Title>
      <Input.Search
        placeholder="Search by item name"
        onSearch={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={filteredItems}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Item No', dataIndex: 'itemNo', key: 'itemNo' },
            { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
            { title: 'Stock', dataIndex: 'stock', key: 'stock' },
            { title: 'Stock in Units', dataIndex: 'stockofunits', key: 'stockofunits' },
            {
              title: 'Manufacturing Date',
              dataIndex: 'manufacturingDate',
              key: 'manufacturingDate',
              render: date => date ? new Date(date).toDateString() : 'N/A'
            },
            {
              title: 'Expiry Date',
              dataIndex: 'expiryDate',
              key: 'expiryDate',
              render: date => date ? new Date(date).toDateString() : 'N/A'
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, item) => (
                <Space>
                  <Button onClick={() => openEditModal(item)}>Edit</Button>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      )}

      <Modal
        title="Edit Item"
        visible={!!editingItem}
        onCancel={() => {
          setEditingItem(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item name="itemName" label="Item Name">
            <Input />
          </Form.Item>
          <Form.Item name="itemNo" label="Item No">
            <InputNumber min={0} disabled />
          </Form.Item>
          <Form.Item name="packRetailPrice" label="Pack Retail Price">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="packingType" label="Packing Type">
            <Input />
          </Form.Item>
          <Form.Item name="minimumquantity" label="Minimum Quantity">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="stripsInPack" label="Strips in Pack">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="tpRate" label="TP Rate">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="unitsInPack" label="Units in Pack">
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="unitsInStrip" label="Units in Strip">
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="manufacturingDate" label="Manufacturing Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
