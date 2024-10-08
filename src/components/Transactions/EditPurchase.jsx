
import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Form,
  Typography,
  Select,
  DatePicker,
  Card,
  Button,
  message,
  Space,
  Switch,
} from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../utilis/firebase";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const EditPurchaseInvoice = ({ onClose = () => {} }) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [totals, setTotals] = useState({
    items: 0,
    quantity: 0,
    retailAmount: 0,
    tradeAmount: 0,
    netAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsSnapshot = await getDocs(collection(db, "items"));
        setItems(itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching items:", error);
        message.error("Failed to fetch items");
      }
    };

    const fetchDistributors = async () => {
      try {
        const distributorsSnapshot = await getDocs(collection(db, "distributors"));
        setDistributors(distributorsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      } catch (error) {
        console.error("Error fetching distributors:", error);
        message.error("Failed to fetch distributors");
      }
    };

    const fetchRecentInvoices = () => {
      const unsubscribe = onSnapshot(collection(db, "purchases"), (snapshot) => {
        const invoices = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const validInvoices = invoices.filter(invoice => invoice.date && invoice.date.toDate);
        setRecentInvoices(validInvoices.sort((a, b) => b.date.toDate() - a.date.toDate()));
      });
      return () => unsubscribe();
    };

    fetchItems();
    fetchDistributors();
    fetchRecentInvoices();
    setLoading(false);
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [data]);

  const fetchInvoiceData = async (invoiceId) => {
    if (!invoiceId) {
      message.error("Invoice ID is missing");
      return;
    }

    setLoading(true);
    try {
      const invoiceDoc = doc(db, "purchases", invoiceId);
      const invoiceData = await getDoc(invoiceDoc);
      if (invoiceData.exists()) {
        const { date, items, invoiceNumber, distributorId } = invoiceData.data();
        form.setFieldsValue({
          date: moment(date.toDate()),
          invoiceNumber,
          distributorId,
        });
        const formattedItems = items.map(item => ({ ...item, key: item.id || Date.now().toString() }));
        setData(formattedItems);
        setOriginalData(formattedItems);
        setSelectedInvoiceId(invoiceId);
      } else {
        message.error("Invoice not found");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      message.error("Failed to fetch invoice data");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const newTotals = data.reduce((acc, item) => {
      const quantity = item.packQty || 0;
      acc.items += 1;
      acc.quantity += quantity;
      acc.retailAmount += quantity * (item.retailPrice || 0);
      acc.tradeAmount += quantity * (item.tradePrice || 0);
      acc.netAmount += item.totalAmount || 0;
      return acc;
    }, { items: 0, quantity: 0, retailAmount: 0, tradeAmount: 0, netAmount: 0 });

    setTotals(newTotals);
  };

  const handleAdd = () => {
    setData([...data, {
      key: Date.now().toString(),
      id: "",
      itemName: "",
      updateStock: true,
      packQuantity: 0,
      unitQty: 0,
      packQty: 0,
      retailPrice: 0,
      tradePrice: 0,
      gst: 0,
      discount: 0,
      totalAmount: 0,
      availableQty: 0,
    }]);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const handleSave = async () => {
    if (!selectedInvoiceId) {
      message.error("No invoice selected");
      return;
    }

    setLoading(true);
    try {
      const selectedDate = form.getFieldValue("date");
      if (!selectedDate || !selectedDate.toDate) {
        throw new Error("Please select a valid purchase date.");
      }

      const updatedInvoiceData = {
        date: selectedDate.toDate(),
        distributorId: form.getFieldValue("distributorId"),
        invoiceNumber: form.getFieldValue("invoiceNumber"),
        items: data,
        totals,
      };

      const batch = writeBatch(db);

      // Update the purchase invoice
      const invoiceRef = doc(db, "purchases", selectedInvoiceId);
      batch.update(invoiceRef, updatedInvoiceData);

      // Update item stocks
      for (const item of data) {
        if (item.updateStock && item.id) {
          const itemRef = doc(db, "items", item.id);
          const itemDoc = await getDoc(itemRef);
          if (itemDoc.exists()) {
            const currentStock = itemDoc.data().stock || 0;
            const originalItem = originalData.find(i => i.id === item.id);
            const originalQuantity = originalItem ? originalItem.packQty || 0 : 0;
            const quantityDifference = (item.packQty || 0) - originalQuantity;
            const newStock = currentStock + quantityDifference;
            batch.update(itemRef, { 
              stock: newStock,
              lastPurchasePrice: item.tradePrice,
              lastPurchaseDate: selectedDate.toDate()
            });
          }
        }
      }

      await batch.commit();
      message.success("Invoice and item stocks updated successfully");
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error(`Failed to update invoice: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (key, itemId) => {
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem) {
      const newData = data.map(item => item.key === key ? {
        ...item,
        id: selectedItem.id,
        itemName: selectedItem.itemName,
        retailPrice: selectedItem.packRetailPrice || 0,
        tradePrice: selectedItem.tpRate || 0,
        packQuantity: selectedItem.unitsInPack || 0,
        availableQty: selectedItem.stock || 0,
        totalAmount: calculateTotalAmount({ ...item, tradePrice: selectedItem.tpRate || 0, packQuantity: selectedItem.unitsInPack || 0 }),
      } : item);
      setData(newData);
    }
  };

  const calculateTotalAmount = (item) => {
    const totalPackAmount = (item.packQty || 0) * (item.tradePrice || 0);
    const totalUnitAmount = ((item.unitQty || 0) * (item.tradePrice || 0)) / (item.packQuantity || 1);
    const totalAmount = totalPackAmount + totalUnitAmount;
    const discountAmount = (totalAmount * (item.discount || 0)) / 100;
    return totalAmount - discountAmount;
  };

  const handleQuantityChange = (key, field, value) => {
    const newValue = Math.max(0, value || 0);
    const newData = data.map(item => {
      if (item.key === key) {
        const newItem = { ...item, [field]: newValue };

        if (field === "unitQty") {
          const totalUnits = newItem.unitQty;
          newItem.packQty += Math.floor(totalUnits / (newItem.packQuantity || 1));
          newItem.unitQty = totalUnits % (newItem.packQuantity || 1);
        }

        newItem.totalAmount = calculateTotalAmount(newItem);
        return newItem;
      }
      return item;
    });
    setData(newData);
  };

  const handleRecentInvoiceSelect = (invoice) => {
    fetchInvoiceData(invoice.id);
    setShowRecent(false);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "itemName",
      key: "itemName",
      render: (_, record) => (
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select an item"
          value={record.id || undefined}
          onChange={(value) => handleItemChange(record.key, value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {items.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.itemName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Available Stock",
      dataIndex: "availableQty",
      key: "availableQty",
      render: (text, record) => <span>{record.availableQty}</span>,
    },
    {
      title: "Update Stock",
      dataIndex: "updateStock",
      key: "updateStock",
      render: (_, record) => (
        <Switch
          checked={record.updateStock}
          onChange={(checked) =>
            setData(
              data.map((item) =>
                item.key === record.key
                  ? { ...item, updateStock: checked }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: "Pack Qty",
      dataIndex: "packQty",
      key: "packQty",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.packQty}
          onChange={(value) => handleQuantityChange(record.key, "packQty", value)}
        />
      ),
    },
    {
      title: "Unit Qty",
      dataIndex: "unitQty",
      key: "unitQty",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.unitQty}
          onChange={(value) => handleQuantityChange(record.key, "unitQty", value)}
        />
      ),
    },
    {
      title: "Retail Price",
      dataIndex: "retailPrice",
      key: "retailPrice",
      render: (_, record) => <span>{record.retailPrice.toFixed(2)}</span>,
    },
    {
      title: "Trade Price",
      dataIndex: "tradePrice",
      key: "tradePrice",
      render: (_, record) => <span>{record.tradePrice.toFixed(2)}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, record) => <span>{record.totalAmount.toFixed(2)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          danger
        />
      ),
    },
  ];

  return (
    <Card title="Edit Purchase Invoice" loading={loading}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Purchase Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Distributor"
          name="distributorId"
          rules={[{ required: true, message: "Please select a distributor" }]}
        >
          <Select placeholder="Select a distributor" style={{ width: "100%" }}>
            {distributors.map((distributor) => (
              <Option key={distributor.id} value={distributor.id}>
                {distributor.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Invoice Number"
          name="invoiceNumber"
          rules={[{ required: true, message: "Please enter an invoice number" }]}
        >
          <Input placeholder="Invoice Number" />
        </Form.Item>
      </Form>
      <Space>
        <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />}>
          Add Item
        </Button>
        <Button
          onClick={handleSave}
          icon={<SaveOutlined />}
          type="primary"
          disabled={!selectedInvoiceId}
        >
          Save
        </Button>
        <Button onClick={() => setShowRecent(!showRecent)}>
          {showRecent ? "Hide Recent Invoices" : "Show Recent Invoices"}
        </Button>
      </Space>
      {showRecent && (
        <div>
          <Title level={4}>Recent Invoices</Title>
          <Table
            dataSource={recentInvoices}
            columns={[
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                render: (date) => moment(date.toDate()).format("YYYY-MM-DD"),
              },
              {
                title: "Invoice Number",
                dataIndex: "invoiceNumber",
                key: "invoiceNumber",
              },
              {
                title: "Distributor",
                dataIndex: "distributorId",
                key: "distributorId",
                render: (_, invoice) => {
                  const distributor = distributors.find(
                    (d) => d.id === invoice.distributorId
                  );
                  return distributor ? distributor.name : "";
                },
              },
              {
                title: "Action",
                key: "action",
                render: (_, invoice) => (
                  <Button
                    onClick={() => handleRecentInvoiceSelect(invoice)}
                    type="link"
                  >
                    Select
                  </Button>
                ),
              },
            ]}
            rowKey="id"
          />
        </div>
      )}
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowKey="key"
        pagination={false}
      />
      <div style={{ marginTop: 20 }}>
        <Title level={4}>Totals</Title>
        <div>
          <strong>Items: </strong> {totals.items}
        </div>
        <div>
          <strong>Quantity: </strong> {totals.quantity}
        </div>
        <div>
          <strong>Retail Amount: </strong> {totals.retailAmount.toFixed(2)}
        </div>
        <div>
          <strong>Trade Amount: </strong> {totals.tradeAmount.toFixed(2)}
        </div>
        <div>
          <strong>Net Amount: </strong> {totals.netAmount.toFixed(2)}
        </div>
      </div>
    </Card>
  );
};

export default EditPurchaseInvoice;
