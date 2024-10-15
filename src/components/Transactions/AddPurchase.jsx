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
  Switch,
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

export default function PurchasePage() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [totals, setTotals] = useState({
    items: 0,
    quantity: 0,
    retailAmount: 0,
    tradeAmount: 0,
    netAmount: 0,
  });
  const [stockCount, setStockCount] = useState(0);

  // Styles
  const styles = {
    button: {
      backgroundColor: "#fca311",
      borderColor: "#fca311",
      color: "#fff",
    },
    buttonHover: {
      backgroundColor: "#e09e09",
      borderColor: "#e09e09",
    },
    tableHeader: {
      backgroundColor: "#fca311",
      color: "#fff",
    },
    tableBody: {
      color: "#333",
    },
  };

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
        return (
          acc +
          (itemData.stock || 0) * itemData.packQuantity +
          (itemData.stockofunits || 0)
        );
      }, 0);
      setStockCount(totalStock);
    } catch (error) {
      console.error("Error fetching stock count:", error);
    }
  };

  const initializeRows = () => {
    setData([{
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
    },]);
  };

  const calculateTotalAmount = (item) => {
    const totalPackAmount = item.packQty * item.tradePrice;
    const totalUnitAmount =
      (item.unitQty * item.tradePrice) / item.packQuantity;
    const totalAmount = totalPackAmount + totalUnitAmount;
    const discountAmount = (totalAmount * (item.discount || 0)) / 100;
    return totalAmount - discountAmount;
  };

  const calculateTotals = () => {
    const newTotals = data.reduce(
      (acc, item) => {
        const quantity = item.packQty || 0;
        acc.items += 1;
        acc.quantity += quantity;
        acc.retailAmount += quantity * (item.retailPrice || 0);
        acc.tradeAmount += quantity * (item.tradePrice || 0);
        acc.netAmount += item.totalAmount || 0;
        return acc;
      },
      { items: 0, quantity: 0, retailAmount: 0, tradeAmount: 0, netAmount: 0 }
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
      },
    ]);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const purchaseData = {
        date: form.getFieldValue("date").toDate(),
        distributorId: form.getFieldValue("distributorId"),
        invoiceNumber: form.getFieldValue("invoiceNumber"),
        items: data.filter((item) => item.itemName),
        totals,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "purchases"), purchaseData);
      await Promise.all(
        data.map(async (item) => {
          if (item.id && item.updateStock) {
            const itemRef = doc(db, "items", item.id);
            const currentItem = await getDocs(collection(db, "items")).then(
              (snapshot) =>
                snapshot.docs.find((doc) => doc.id === item.id)?.data()
            );

            const updatedStock = (currentItem.stock || 0) + item.packQty;

            await updateDoc(itemRef, { stock: updatedStock });
          }
        })
      );

      message.success("Purchase saved successfully");
      form.resetFields();
      initializeRows();
    } catch {
      message.error("Failed to save purchase");
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
              retailPrice: selectedItem.packRetailPrice || 0,
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
    const newValue = Math.max(0, value || 0);
    const newData = data.map((item) => {
      if (item.key === key) {
        const newItem = { ...item, [field]: newValue };

        if (field === "unitQty") {
          const totalUnits = newItem.unitQty;
          newItem.packQty += Math.floor(totalUnits / newItem.packQuantity);
          newItem.unitQty = totalUnits % newItem.packQuantity;
        }

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
      title: "Update Stock",
      dataIndex: "updateStock",
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
      render: (_, record) => (
        <InputNumber
          value={record.packQty}
          onChange={(value) =>
            handleQuantityChange(record.key, "packQty", value)
          }
          min={0}
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
          min={0}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Retail Price",
      dataIndex: "retailPrice",
      render: (_, record) => (
        <InputNumber
          value={record.retailPrice}
          onChange={(value) =>
            handleQuantityChange(record.key, "retailPrice", value)
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
      render: (_, record) => `$ ${(record.totalAmount || 0).toFixed(2)}`,
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
        <Title level={3}>Purchase Invoice</Title>
        <Form form={form} layout="vertical">
          <Space style={{ marginBottom: 16 }} align="baseline">
            <Form.Item name="date" label="Purchase Date">
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
            style={{ marginBottom: 16, ...styles.button }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.borderColor = styles.buttonHover.borderColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
              e.target.style.borderColor = styles.button.borderColor;
            }}
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
                    {totals.retailAmount.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    {totals.tradeAmount.toFixed(2)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    {totals.netAmount.toFixed(2)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
            rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
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
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                  e.target.style.borderColor = styles.buttonHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = styles.button.backgroundColor;
                  e.target.style.borderColor = styles.button.borderColor;
                }}
                onClick={handleSave}
              >
                Save Purchase
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
