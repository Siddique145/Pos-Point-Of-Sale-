import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  Button,
  Table,
  InputNumber,
  Card,
  Typography,
  message,
  Space,
} from 'antd';
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../utilis/firebase';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const { Title } = Typography;
const { Option } = Select;

const GenerateOrder = () => {
  const [form] = Form.useForm();
  const [distributors, setDistributors] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderGenerated, setOrderGenerated] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
      setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching distributors:', error);
      message.error('Failed to load distributors');
    }
  };

  const generateOrder = async (distributorId) => {
    setLoading(true);
    try {
      const itemsQuery = query(collection(db, 'items'), where('distributorId', '==', distributorId));
      const itemsSnapshot = await getDocs(itemsQuery);
      const fetchedItems = itemsSnapshot.docs.map(doc => {
        const data = doc.data();
        const requiredStock = Math.max(0, data.minimumquantity - data.stock);
        return {
          ...data,
          id: doc.id,
          requiredStock,
          orderQuantity: requiredStock,
          totalPrice: requiredStock * data.tpRate,
        };
      });
      setItems(fetchedItems);
      calculateTotal(fetchedItems);
      setOrderGenerated(true);
    } catch (error) {
      console.error('Error generating order:', error);
      message.error('Failed to generate order');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, orderQuantity: value, totalPrice: value * item.tpRate } : item
    );
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const saveOrder = async () => {
    try {
      const orderData = {
        distributorId: form.getFieldValue('distributorId'),
        items: items.map(({ id, itemName, orderQuantity, totalPrice }) => ({
          id,
          itemName,
          orderQuantity,
          totalPrice,
        })),
        totalAmount,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'orders'), orderData);
      message.success('Order saved successfully');
    } catch (error) {
      console.error('Error saving order:', error);
      message.error('Failed to save order');
    }
  };

  const printOrder = () => {
    const doc = new jsPDF();
    doc.text('Order Form', 14, 15);
    
    const tableColumn = ["Item Name", "Required Quantity", "Trade Price", "Total Price"];
    const filteredItems = items.filter(item => item.orderQuantity > 0);
    const tableRows = filteredItems.map(item => [
      item.itemName,
      item.orderQuantity,
      `₹${item.tpRate.toFixed(2)}`,
      `₹${item.totalPrice.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    if (filteredItems.length > 0) {
      doc.text(`Total Amount: ₹${filteredItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    } else {
      doc.text('No items to print.', 14, doc.lastAutoTable.finalY + 10);
    }

    doc.save("order.pdf");
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
      width: '30%', // Reduce width
    },
    {
      title: 'Min Quantity',
      dataIndex: 'minimumquantity',
      key: 'minimumquantity',
      width: '15%', // Reduce width
    },
    {
      title: 'Available Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '15%', // Reduce width
    },
    {
      title: 'Required Stock',
      dataIndex: 'requiredStock',
      key: 'requiredStock',
      width: '15%', // Reduce width
    },
    {
      title: 'Order Quantity',
      dataIndex: 'orderQuantity',
      key: 'orderQuantity',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.orderQuantity}
          style={{ width: '80%' }} // Reduce width of InputNumber
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
      width: '15%', // Reduce width
    },
    {
      title: 'Trade Price',
      dataIndex: 'tpRate',
      key: 'tpRate',
      render: (value) => `₹${value.toFixed(2)}`,
      width: '8%', // Reduce width
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => `₹${value.toFixed(2)}`,
      width: '8%', // Reduce width
    },
  ];

  return (
    <Card style={{ maxWidth: 800, margin: 'auto', padding: '0px' }}> {/* Reduced width */}
      <Title level={3} style={{ textAlign: 'center', marginBottom: '0px' }}> {/* Reduced font size */}
        Generate Order Form
      </Title>
      <Form form={form} layout="vertical" style={{ padding: '0px' }}>
        <Form.Item
          name="distributorId"
          label="Select Distributor"
          rules={[{ required: true, message: 'Please select a distributor!' }]}
        >
          <Select
            placeholder="Select a distributor"
            showSearch
            onChange={(value) => generateOrder(value)}
            loading={loading}
            filterOption={(input, option) => 
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {distributors.map(distributor => (
              <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {orderGenerated && (
        <>
          <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: '0px' }}>
            <Table
              dataSource={items}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="small" // Set table size to small
              rowClassName={(record) => record.stock < record.minimumquantity ? 'bg-red-300' : ''}
            />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '0px' }}>
            <Title level={4} style={{ margin: 0 }}>Total Amount: ₹{totalAmount.toFixed(2)}</Title> {/* Reduced margin */}
          </div>
          <Space style={{ marginTop: '0px' }}>
            <Button type="primary" size="small" onClick={saveOrder}> {/* Set button size to small */}
              Save Order
            </Button>
            <Button size="small" onClick={printOrder} disabled={!orderGenerated}>
              Print Order
            </Button>
          </Space>
        </>
      )}
    </Card>
  );
};

export default GenerateOrder;  