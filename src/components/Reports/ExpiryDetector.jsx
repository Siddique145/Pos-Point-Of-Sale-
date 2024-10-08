import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  Input,
  Button,
  List,
  Card,
  Typography,
  message,
} from 'antd';
import { db } from '../../utilis/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Option } = Select;
const { Title } = Typography;

export default function ExpiryDetector() {
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [monthsBeforeExpiry, setMonthsBeforeExpiry] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
        setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching distributors:', error);
        message.error('Failed to load distributors. Please try again.');
      }
    };

    fetchDistributors();
  }, []);

  const handleSearch = async () => {
    if (!selectedDistributor) {
      message.error('Please select a distributor.');
      return;
    }

    const currentDate = new Date();
    const expiryDateThreshold = new Date();
    expiryDateThreshold.setMonth(currentDate.getMonth() + monthsBeforeExpiry);

    try {
      const itemsQuery = query(
        collection(db, 'items'),
        where('distributorId', '==', selectedDistributor),
        where('expiryDate', '<=', expiryDateThreshold)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching items:', error);
      message.error('Failed to load items. Please try again.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const element = document.getElementById('pdf-content');

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Define image width
      const pageHeight = 295; // A4 page height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('expiry-report.pdf');
    });
  };

  return (
    <Card style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Expiry Detector
      </Title>
      <Form layout="vertical" onFinish={handleSearch}>
        <Form.Item
          name="distributorId"
          label="Select Distributor"
          rules={[{ required: true, message: 'Please select a distributor!' }]}
        >
          <Select
            placeholder="Select a distributor"
            onChange={value => setSelectedDistributor(value)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {distributors.map(distributor => (
              <Option key={distributor.id} value={distributor.id}>{distributor.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Months Before Expiry"
          rules={[{ required: true, message: 'Please input the number of months!' }]}
        >
          <Input
            type="number"
            min={1}
            value={monthsBeforeExpiry}
            onChange={e => setMonthsBeforeExpiry(e.target.value)}
            placeholder="Enter number of months"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Search
          </Button>
        </Form.Item>
      </Form>

      {items.length > 0 && (
        <div>
          <List
            id="pdf-content"
            header={<div>Items Expiring Soon</div>}
            bordered
            dataSource={items}
            renderItem={item => (
              <List.Item style={{ backgroundColor: 'red', color: 'white' }}>
                <div>{item.itemName} - Expiry Date: {new Date(item.expiryDate.seconds * 1000).toLocaleDateString()}</div>
              </List.Item>
            )}
          />
          <Button type="primary" onClick={generatePDF} style={{ marginTop: '20px' }}>
            Download PDF
          </Button>
        </div>
      )}
    </Card>
  );
}
