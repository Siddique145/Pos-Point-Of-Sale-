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
  Statistic,
  Space,
} from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../utilis/firebase";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

export default function PurchaseReturnPage() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [totals, setTotals] = useState({
    items: 0,
    quantity: 0,
    tradeAmount: 0,
    netAmount: 0,
  });
  const [stockCount, setStockCount] = useState(0);

  useEffect(() => {
    const unsubscribeItems = onSnapshot(
      collection(db, "items"),
      (itemsSnapshot) => {
        setItems(
          itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        fetchStockCount();
      }
    );

    const unsubscribeDistributors = onSnapshot(
      collection(db, "distributors"),
      (distributorsSnapshot) => {
        setDistributors(
          distributorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        );
      }
    );

    initializeRows();

    return () => {
      unsubscribeItems();
      unsubscribeDistributors();
    };
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [data]);

  const fetchStockCount = async () => {
    try {
      const itemsSnapshot = await getDocs(collection(db, "items"));
      const totalStock = itemsSnapshot.docs.reduce((acc, doc) => {
        const itemData = doc.data();
        return acc + (itemData.stock || 0);
      }, 0);
      setStockCount(totalStock);
    } catch (error) {
      console.error("Error fetching stock count:", error);
    }
  };

  const initializeRows = () => {
    setData([
      {
        key: Date.now().toString(),
        id: "",
        itemName: "",
        packQuantity: 0,
        unitQty: 0,
        packQty: 0,
        tradePrice: 0,
        discount: 0,
        totalAmount: 0,
        availableQty: 0,
      },
    ]);
  };

  const calculateTotalAmount = (item) => {
    const totalPackAmount = item.packQty * item.tradePrice;
    const totalUnitAmount =
      (item.unitQty * item.tradePrice) / item.packQuantity;
    const totalAmount = totalPackAmount + totalUnitAmount;
    const discountAmount = (totalAmount * (item.discount || 0)) / 100;
    return -Math.max(totalAmount - discountAmount, 0); // Return negative amount
  };

  const calculateTotals = () => {
    const newTotals = data.reduce(
      (acc, item) => {
        const quantity = -(item.packQty || 0); // Negative quantity
        acc.items += 1;
        acc.quantity += quantity; // Sum as negative
        acc.tradeAmount += quantity * (item.tradePrice || 0); // Negative trade amount
        acc.netAmount += item.totalAmount || 0; // This is already negative
        return acc;
      },
      { items: 0, quantity: 0, tradeAmount: 0, netAmount: 0 }
    );

    setTotals(newTotals);
  };

  const handleAdd = () => {
    setData((prevData) => [
      ...prevData,
      {
        key: Date.now().toString(),
        id: "",
        itemName: "",
        packQuantity: 0,
        unitQty: 0,
        packQty: 0,
        tradePrice: 0,
        discount: 0,
        totalAmount: 0,
        availableQty: 0,
      },
    ]);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const isDataValid = () => {
        const date = form.getFieldValue("date");
        const distributorId = form.getFieldValue("distributorId");
        const invoiceNumber = form.getFieldValue("invoiceNumber");

        const validItems = data.every(
          (item) => item.itemName && (item.packQty > 0 || item.unitQty > 0)
        );

        return date && distributorId && invoiceNumber && validItems;
      };

      // Check stock availability before saving
      const insufficientStock = data.some((item) => {
        const currentItem = items.find((i) => i.id === item.id);
        return currentItem && currentItem.stock <= 0;
      });

      if (insufficientStock) {
        message.error(
          "One or more items have insufficient stock (zero stock). Cannot save return."
        );
        setLoading(false);
        return;
      }

      if (!isDataValid()) {
        message.error("Please fill all required fields correctly.");
        setLoading(false);
        return;
      }

      const returnData = {
        date: form.getFieldValue("date").toDate(),
        distributorId: form.getFieldValue("distributorId"),
        invoiceNumber: form.getFieldValue("invoiceNumber"),
        items: data
          .filter((item) => item.itemName)
          .map((item) => ({
            ...item,
            totalAmount: -Math.abs(item.totalAmount), // Ensure total amount is negative
            packQty: -Math.abs(item.packQty), // Negative pack quantity
            unitQty: -Math.abs(item.unitQty), // Negative unit quantity
          })),
        totals: {
          ...totals,
          tradeAmount: -Math.abs(totals.tradeAmount), // Negative trade amount
          netAmount: -Math.abs(totals.netAmount), // Negative net amount
        },
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "purchaseReturns"), returnData);

      // Update stock with negative quantities
      await Promise.all(
        data.map(async (item) => {
          if (item.id) {
            const itemRef = doc(db, "items", item.id);
            const currentItem = await getDocs(collection(db, "items")).then(
              (snapshot) =>
                snapshot.docs.find((doc) => doc.id === item.id)?.data()
            );

            const updatedStock = (currentItem.stock || 0) - item.packQty; // Reduce stock
            await updateDoc(itemRef, { stock: updatedStock });
          }
        })
      );

      message.success("Return saved successfully");
      form.resetFields();
      initializeRows();
    } catch (error) {
      console.error("Error saving return:", error);
      message.error("Failed to save return");
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (key, itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);
    if (selectedItem) {
      const newData = data.map((item) =>
        item.key === key
          ? {
              ...item,
              id: selectedItem.id,
              itemName: selectedItem.itemName,
              tradePrice: selectedItem.tpRate || 0,
              packQuantity: selectedItem.unitsInPack || 0,
              availableQty: selectedItem.stock || 0,
              totalAmount: calculateTotalAmount(item),
            }
          : item
      );
      setData(newData);
    }
  };

  const handleQuantityChange = (key, field, value) => {
    const newValue = Math.max(value || 0, 0); // Prevent negative values
    const newData = data.map((item) => {
      if (item.key === key) {
        const newItem = { ...item, [field]: newValue };
        newItem.totalAmount = calculateTotalAmount(newItem);
        return newItem;
      }
      return item;
    });
    setData(newData);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "itemName",
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
      render: (text, record) => <span>{record.availableQty}</span>,
    },
    {
      title: "Pack Qty",
      dataIndex: "packQty",
      render: (_, record) => (
        <InputNumber
          value={record.packQty}
          onChange={(value) =>
            handleQuantityChange(record.key, "packQty", value)
          }
          min={0} // Prevent negative inputs
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Qty",
      dataIndex: "unitQty",
      render: (_, record) => (
        <InputNumber
          value={record.unitQty}
          onChange={(value) =>
            handleQuantityChange(record.key, "unitQty", value)
          }
          min={0} // Prevent negative inputs
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Trade Price",
      dataIndex: "tradePrice",
      render: (_, record) => (
        <InputNumber
          value={record.tradePrice}
          onChange={(value) =>
            handleQuantityChange(record.key, "tradePrice", value)
          }
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      render: (_, record) => (
        <InputNumber
          value={record.discount}
          onChange={(value) =>
            handleQuantityChange(record.key, "discount", value)
          }
          min={0}
          max={100}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (_, record) => `$ ${(-1 * (record.totalAmount || 0)).toFixed(2)}`, // Show negative value
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Title level={3}>Purchase Return Page</Title>
        <Form form={form} layout="vertical">
          <Space style={{ marginBottom: 16 }} align="baseline">
            <Form.Item name="date" label="Return Date">
              <DatePicker style={{ width: 200 }} defaultValue={moment()} />
            </Form.Item>
            <Form.Item name="distributorId" label="Distributor">
              <Select
                placeholder="Select a distributor"
                allowClear
                style={{ width: 200 }}
              >
                {distributors.map((dist) => (
                  <Option key={dist.id} value={dist.id}>
                    {dist.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="invoiceNumber" label="Invoice Number">
              <Input
                placeholder="Enter invoice number"
                style={{ width: 200 }}
              />
            </Form.Item>
          </Space>
          <Button
            type="dashed"
            onClick={handleAdd}
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Add Item
          </Button>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell>Total</Table.Summary.Cell>
                  <Table.Summary.Cell>{totals.items}</Table.Summary.Cell>
                  <Table.Summary.Cell>{totals.quantity}</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    {(-1 * totals.tradeAmount).toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    {(-1 * totals.netAmount).toFixed(2)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
          <div
            style={{
              position: "sticky",
              bottom: 0,
              background: "#fff",
              zIndex: 1,
            }}
          >
            <Space
              style={{
                marginTop: 16,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
              >
                Save Return
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
      <div style={{ marginTop: 20 }}>
        <Statistic title="Total Stock Count" value={stockCount} />
      </div>
    </div>
  );
}
