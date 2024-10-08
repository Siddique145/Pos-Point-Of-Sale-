// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin, message } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// const { Title } = Typography;

// const EditCompanyProfile = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       try {
//         const snapshot = await getDocs(collection(db, 'companies'));
//         const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setCompanies(companyList);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const onSearch = () => {
//     const company = companies.find(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
//     if (company) {
//       setSelectedCompany(company);
//       form.setFieldsValue(company);
//     } else {
//       message.error('Company not found');
//       setSelectedCompany(null);
//       form.resetFields();
//     }
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const companyRef = doc(db, 'companies', selectedCompany.id);
//       await updateDoc(companyRef, {
//         name: values.name,
//         address: values.address,
//         website: values.website,
//         description: values.description,
//         updatedAt: new Date(),
//       });
//       message.success('Company updated successfully');
//       // Clear the selected company and reset form
//       setSelectedCompany(null);
//       form.resetFields();
//       // Re-fetch companies to get updated data
//       const snapshot = await getDocs(collection(db, 'companies'));
//       const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setCompanies(companyList);
//     } catch (error) {
//       console.error('Error updating company:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Edit Company Profile
//       </Title>
//       <Input.Search
//         placeholder="Search Company by Name"
//         value={searchQuery}
//         onChange={e => setSearchQuery(e.target.value)}
//         onSearch={onSearch}
//         enterButton
//         style={{ marginBottom: '20px' }}
//       />
//       <Form form={form} name="edit_company" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Company Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the company name!' }]}
//         >
//           <Input placeholder="Enter company name" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: 'Please input the address!' }]}
//         >
//           <Input placeholder="Enter address" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Website"
//           name="website"
//           rules={[
//             { required: true, message: 'Please input the website!' },
//             { type: 'url', message: 'Please enter a valid URL!' }
//           ]}
//         >
//           <Input placeholder="Enter website URL" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter company description" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading} disabled={!selectedCompany}>
//             {loading ? 'Updating...' : 'Update Company'}
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

// export default EditCompanyProfile;


// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Card, Typography, List, Spin, message } from 'antd';
// import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
// import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// const { Title } = Typography;

// const EditCompanyProfile = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       try {
//         const snapshot = await getDocs(collection(db, 'companies'));
//         const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setCompanies(companyList);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//         message.error('Failed to load companies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     const filteredCompanies = companies.filter(c => 
//       c.name && c.name.toLowerCase().includes(query.toLowerCase()) // Check if c.name exists
//     );

//     if (filteredCompanies.length > 0) {
//       setSelectedCompany(filteredCompanies[0]); // Automatically select the first match
//       form.setFieldsValue(filteredCompanies[0]); // Pre-fill the form with the selected company
//     } else {
//       setSelectedCompany(null);
//       form.resetFields();
//     }
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const companyRef = doc(db, 'companies', selectedCompany.id);
//       await updateDoc(companyRef, {
//         name: values.name,
//         address: values.address,
//         website: values.website,
//         description: values.description,
//         updatedAt: serverTimestamp(),
//       });
//       message.success('Company updated successfully');
//       // Clear the selected company and reset form
//       setSelectedCompany(null);
//       form.resetFields();
//       // Re-fetch companies to get updated data
//       const snapshot = await getDocs(collection(db, 'companies'));
//       const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setCompanies(companyList);
//     } catch (error) {
//       console.error('Error updating company:', error);
//       message.error('Failed to update company');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
//       <Title level={3} style={{ textAlign: 'center' }}>
//         Edit Company Profile
//       </Title>
//       <Input.Search
//         placeholder="Search Company by Name"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         style={{ marginBottom: '20px' }}
//       />
//       <Form form={form} name="edit_company" onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Company Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the company name!' }]}
//         >
//           <Input placeholder="Enter company name" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: 'Please input the address!' }]}
//         >
//           <Input placeholder="Enter address" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Website"
//           name="website"
//           rules={[
//             { required: true, message: 'Please input the website!' },
//             { type: 'url', message: 'Please enter a valid URL!' }
//           ]}
//         >
//           <Input placeholder="Enter website URL" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item
//           label="Description"
//           name="description"
//           rules={[{ required: true, message: 'Please provide a description!' }]}
//         >
//           <Input.TextArea rows={4} placeholder="Enter company description" disabled={!selectedCompany} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block loading={loading} disabled={!selectedCompany}>
//             {loading ? 'Updating...' : 'Update Company'}
//           </Button>
//         </Form.Item>
//       </Form>

//       <div style={{ height: '30%', overflowY: 'auto', marginTop: '20px' }}>
//         <Title level={4}>Company List</Title>
//         <Spin spinning={loading}>
//           <List
//             size="small"
//             bordered
//             dataSource={companies.filter(c => c.name && c.name.toLowerCase().includes(searchQuery.toLowerCase()))} // Check if c.name exists
//             renderItem={item => (
//               <List.Item
//                 key={item.id}
//                 onClick={() => {
//                   setSelectedCompany(item);
//                   form.setFieldsValue(item); // Pre-fill the form with selected item
//                 }}
//                 style={{ cursor: 'pointer' }}
//               >
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

// export default EditCompanyProfile;



























import React, { useState, useEffect } from 'react';
import { db } from '../../utilis/firebase'; // Adjust the import based on your Firebase config
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { message } from 'antd'; // Importing Ant Design's message

const EditCompanyProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    website: '',
    description: '',
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'companies'));
        const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
        message.error('Failed to load companies'); // Use Ant Design message for errors
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredCompanies = companies.filter(c =>
      c.name && c.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredCompanies.length > 0) {
      setSelectedCompany(filteredCompanies[0]);
      setFormValues(filteredCompanies[0]);
    } else {
      setSelectedCompany(null);
      setFormValues({
        name: '',
        address: '',
        website: '',
        description: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCompany) return;

    setLoading(true);
    try {
      const companyRef = doc(db, 'companies', selectedCompany.id);
      await updateDoc(companyRef, {
        ...formValues,
        updatedAt: serverTimestamp(),
      });
      message.success('Company updated successfully'); // Success message
      setSelectedCompany(null);
      setFormValues({
        name: '',
        address: '',
        website: '',
        description: '',
      });
      const snapshot = await getDocs(collection(db, 'companies'));
      const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList);
    } catch (error) {
      console.error('Error updating company:', error);
      message.error('Failed to update company'); // Error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Edit Company Profile</h3>
      <input
        type="text"
        placeholder="Search Company by Name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formValues.name}
          onChange={handleInputChange}
          disabled={!selectedCompany}
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formValues.address}
          onChange={handleInputChange}
          disabled={!selectedCompany}
          style={styles.input}
        />
        <input
          type="url"
          name="website"
          placeholder="Website URL"
          value={formValues.website}
          onChange={handleInputChange}
          disabled={!selectedCompany}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Company Description"
          value={formValues.description}
          onChange={handleInputChange}
          disabled={!selectedCompany}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button} disabled={!selectedCompany}>
          {loading ? 'Updating...' : 'Update Company'}
        </button>
      </form>

      <div style={styles.listContainer}>
        <h4 style={styles.listTitle}>Company List</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={styles.list}>
            {companies.filter(c => c.name && c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedCompany(item);
                  setFormValues(item);
                }}
                style={styles.listItem}
              >
                <strong>{item.name}</strong> - {item.address}
                <div>
                  <a href={item.website} target="_blank" rel="noopener noreferrer">
                    {item.website}
                  </a>
                </div>
                <p>{item.description}</p>
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
    height: '105vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  form: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    minHeight: '100px',
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
    flex: '1',
    overflowY: 'auto',
    marginTop: '20px',
    maxHeight: '300px',
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
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EditCompanyProfile;
