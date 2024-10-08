
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  InputNumber,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Button,
  message,
  Layout,
  Space,
  AutoComplete,
  Drawer,
  Spin,
} from "antd";
import {
  SaveOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utilis/firebase";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getAuth, signOut } from "firebase/auth";
const { Title, Text } = Typography;
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const auth = getAuth(); // Initialize the auth object
const MemoizedTable = React.memo(
  ({ saleItems, onQuantityChange, onDiscountChange, onDeleteItem }) => (
    <Table
      dataSource={saleItems}
      columns={[
        { title: "ID", dataIndex: "id", key: "id", width: 100 },
        { title: "Item", dataIndex: "itemName", key: "itemName", width: 200 },
        { title: "Stock", dataIndex: "stock", key: "stock", width: 100 },
        {
          title: "TP (Trade Price)",
          dataIndex: "tpRate",
          key: "tpRate",
          width: 100,
          render: (value) =>
            value !== undefined ? `₹${value.toFixed(2)}` : "N/A",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          width: 100,
          render: (_, record) => (
            <InputNumber
              id={record.id}
              min={1}
              max={record.stock}
              value={record.quantity}
              onChange={(value) => onQuantityChange(record.id, value)}
              disabled={record.stock === 0}
            />
          ),
        },
        {
          title: "Unit Price",
          dataIndex: "packRetailPrice",
          key: "packRetailPrice",
          width: 100,
          render: (value) =>
            value !== undefined ? `₹${value.toFixed(2)}` : "N/A",
        },
        {
          title: "Discount (%)",
          dataIndex: "discount",
          key: "discount",
          width: 100,
          render: (_, record) => (
            <InputNumber
              min={0}
              max={100}
              value={record.discount}
              onChange={(value) => onDiscountChange(record.id, value)}
            />
          ),
        },
        {
          title: "Total",
          dataIndex: "totalAmount",
          key: "totalAmount",
          width: 100,
          render: (value) =>
            value !== undefined ? `₹${value.toFixed(2)}` : "N/A",
        },
        {
          title: "Action",
          key: "action",
          width: 100,
          render: (_, record) => (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteItem(record.id)}
            />
          ),
        },
      ]}
      pagination={false}
      rowKey="id"
    />
  )
);
export default function POS() {
  const [items, setItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [customerNumber, setCustomerNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const tableRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchItems();
      const lastInvoiceNumber = await fetchLastInvoiceNumber();
      const invoices = await fetchSavedInvoices();
      setItems(items);
      setInvoiceNumber(lastInvoiceNumber);
      setSavedInvoices(invoices);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(async () => {
 const items = await fetchItems();
      setItems(items);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const fetchItems = async () => {
    try {
      const itemsSnapshot = await getDocs(collection(db, "items"));
      return itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching items:", error);
      message.error("Failed to load items");
      return [];
    }
  };
  const fetchLastInvoiceNumber = async () => {
    try {
      const salesSnapshot = await getDocs(collection(db, "sales"));
      const lastInvoice = salesSnapshot.docs
        .map((doc) => doc.data().invoiceNumber)
        .reduce((max, current) => Math.max(max, current), 0);
      return lastInvoice + 1;
    } catch (error) {
      console.error("Error fetching last invoice number:", error);
      return 1;
    }
  };
  const fetchSavedInvoices = async () => {
    try {
      const invoicesSnapshot = await getDocs(collection(db, "sales"));
      return invoicesSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    } catch (error) {
      console.error("Error fetching saved invoices:", error);
      return [];
    }
  };
  const addItemToSale = (item) => {
    if (item.stock === 0) {
      message.error("Item is out of stock");
      return;
    }
    setSaleItems((prevSaleItems) => {
      const existingItem = prevSaleItems.find(
        (saleItem) => saleItem.id === item.id
      );
      if (existingItem) {
        return prevSaleItems.map((saleItem) =>
          saleItem.id === item.id
            ? {
                ...saleItem,
                quantity: saleItem.quantity + 1,
                totalAmount:
                  (saleItem.quantity + 1) *
                  saleItem.packRetailPrice *
                  (1 - saleItem.discount / 100),
              }
            : saleItem
        );
      }
      return [
        ...prevSaleItems,
        {
          ...item,
          quantity: 1,
          discount: 0,
          totalAmount: item.packRetailPrice,
        },
      ];
    });
    setSearchValue(""); // Clear the search value after selection
  };

  const handleQuantityChange = (id, value) => {
    if (value > 0) {
      setSaleItems((prevSaleItems) =>
        prevSaleItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: value,
                totalAmount:
                  value * item.packRetailPrice * (1 - item.discount / 100),
              }
            : item
        )
      );
    } else {
      message.error("Quantity must be greater than 0");
    }
  };
  const handleDiscountChange = (id, value) => {
    if (value >= 0 && value <= 100) {
      setSaleItems((prevSaleItems) =>
        prevSaleItems.map((item) =>
          item.id === id
            ? {
                ...item,
                discount: value,
                totalAmount:
                  item.quantity * item.packRetailPrice * (1 - value / 100),
              }
            : item
        )
      );
    } else {
      message.error("Discount must be between 0 and 100");
    }
  };

  const handleDeleteItem = (id) => {
    setSaleItems((prevSaleItems) =>
      prevSaleItems.filter((item) => item.id !== id)
    );
  };
  const calculateTotals = () => {
    const totalAmount = saleItems.reduce(
      (sum, item) => sum + item.quantity * item.packRetailPrice,
      0
    );
    const totalDiscount = saleItems.reduce(
      (sum, item) =>
        sum + item.quantity * item.packRetailPrice * (item.discount / 100),
      0
    );
    const totalQuantity = saleItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    const totalTradePrice = saleItems.reduce(
      (sum, item) => sum + item.quantity * (item.tpRate || 0),
      0
    );
    const totalPayable = totalAmount - totalDiscount;
    const profit = totalPayable - totalTradePrice;

    return { totalAmount, totalDiscount, totalQuantity, profit };
  };
  const saveSale = async () => {
    if (saving) return;
    setSaving(true);
    const { profit } = calculateTotals();
    if (profit < 0) {
      message.error(
        "Sale is in loss. Please adjust the quantities or prices to make a profit."
      );
      setSaving(false);
      return;
    }
    try {
      const { totalAmount, totalDiscount, totalQuantity } = calculateTotals();
      const saleData = {
        invoiceNumber,
        customerNumber,
        items: saleItems,
        totalAmount,
        totalDiscount,
        totalQuantity,
        profit,
        paymentMode,
        paymentAmount,
        change: paymentAmount - (totalAmount - totalDiscount),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "sales"), saleData);
      await Promise.all(
        saleItems.map(async (item) => {
          const itemRef = doc(db, "items", item.id);
          await updateDoc(itemRef, {
            stock: item.stock - item.quantity,
          });
        })
      );

      message.success("Sale saved successfully");
      printInvoice(saleData);
      resetSale();
      setSaving(false);
    } catch (error) {
      console.error("Error saving sale:", error);
      message.error("Failed to save sale");
      setSaving(false);
    }
  };
  const resetSale = () => {
    setSaleItems([]);
    setCustomerNumber("");
    setPaymentMode("cash");
    setPaymentAmount(0);
    setInvoiceNumber((prev) => prev + 1);
    setSearchValue(""); // Reset search value
    fetchSavedInvoices(); // Refresh saved invoices
  };

  const printInvoice = (saleData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("M-Siddique Point of Sale", 14, 22);
    doc.setFontSize(12);
    doc.text(`Invoice #: ${saleData.invoiceNumber}`, 14, 30);
    doc.text(`Customer #: ${saleData.customerNumber}`, 14, 38);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 46);

    const tableRows = saleData.items.map((item) => [
      item.itemName,
      item.quantity,
      `₹${item.packRetailPrice.toFixed(2)}`,
      `${item.discount}%`,
      `₹${item.totalAmount.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["Item", "Quantity", "Price", "Discount", "Total"]],
      body: tableRows,
      startY: 60,
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Amount: ₹${saleData.totalAmount.toFixed(2)}`, 14, finalY);
    doc.text(`Discount: ₹${saleData.totalDiscount.toFixed(2)}`, 14, finalY + 8);
    doc.text(`Paid: ₹${saleData.paymentAmount.toFixed(2)}`, 14, finalY + 16);
    doc.text(`Change: ₹${saleData.change.toFixed(2)}`, 14, finalY + 24);
    // doc.text(`Profit: ₹${saleData.profit.toFixed(2)}`, 14, finalY + 32);

    doc.save(`invoice_${saleData.invoiceNumber}.pdf`);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleEditInvoice = async (invoice) => {
    setEditingInvoice(invoice);
    setSaleItems(invoice.items.map((item) => ({ ...item }))); // Load the selected invoice items for editing
    setInvoiceNumber(invoice.invoiceNumber);
    setCustomerNumber(invoice.customerNumber);
    setPaymentMode(invoice.paymentMode);
    setPaymentAmount(invoice.paymentAmount);
    setSearchValue(""); // Reset search value
    setDrawerVisible(false); // Close the drawer
  };
  const cancelEdit = () => {
    setEditingInvoice(null);
    resetSale(); // Reset the sale form
  };
  const updateInvoice = async () => {
    if (saving) return;
    setSaving(true);
    const { profit } = calculateTotals();
    if (profit < 0) {
      message.error(
        "Sale is in loss. Please adjust the quantities or prices to make a profit."
      );
      setSaving(false);
      return;
    }
    try {
      const { totalAmount, totalDiscount, totalQuantity } = calculateTotals();
      const saleData = {
        invoiceNumber,
        customerNumber,
        items: saleItems,
        totalAmount,
        totalDiscount,
        totalQuantity,
        profit,
        paymentMode,
        paymentAmount,
        change: paymentAmount - (totalAmount - totalDiscount),
        createdAt: serverTimestamp(),
      };

      const invoiceRef = doc(db, "sales", editingInvoice.id);
      await updateDoc(invoiceRef, saleData);
      message.success("Invoice updated successfully");
      printInvoice(saleData); // Print updated invoice
      resetSale();
      setSaving(false);
    } catch (error) {
      console.error("Error updating invoice:", error);
      message.error("Failed to update invoice");
      setSaving(false);
    }
  };

  const printSavedInvoice = (invoice) => {
    printInvoice(invoice);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Successfully logged out");
      // Optionally redirect the user to a login page or home page
    } catch (error) {
      console.error("Error logging out:", error);
      message.error("Failed to log out");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>M-Siddique's Point of Sale</Title>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Saved / Reprint
        </Button>
        {/* <Button type="default" onClick={handleLogout}>
          Logout
        </Button> */}
      </Header>
      <Content style={{ padding: "20px", overflow: "auto" }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>Invoice #: {invoiceNumber}</Text>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Customer Number"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Text strong>{new Date().toLocaleString()}</Text>
            </Col>
          </Row>

          <Row style={{ marginTop: "20px" }}>
            <Col span={24}>
              <AutoComplete
                style={{ width: "100%" }}
                options={filteredItems.map((item) => ({
                  value: item.itemName,
                  label: `${item.itemName} - ₹${item.packRetailPrice.toFixed(
                    2
                  )}`,
                }))}
                onSelect={(value) => {
                  const selectedItem = items.find(
                    (item) => item.itemName === value
                  );
                  if (selectedItem) {
                    addItemToSale(selectedItem);
                  }
                }}
                onSearch={handleSearch}
                placeholder="Search and select an item"
              >
                <Input suffix={<SearchOutlined />} />
              </AutoComplete>
            </Col>
          </Row>

          <div
            ref={tableRef}
            style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
          >
            <MemoizedTable
              saleItems={saleItems}
              onQuantityChange={handleQuantityChange}
              onDiscountChange={handleDiscountChange}
              onDeleteItem={handleDeleteItem}
            />
          </div>

          <Footer
            style={{
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              padding: "10px 20px",
              background: "#f0f2f5",
            }}
          >
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col span={12}>
                <Space direction="horizontal">
                  <Text strong>Total Items: {saleItems.length}</Text>
                  <Text strong>
                    Total Quantity: {calculateTotals().totalQuantity}
                  </Text>
                  <Text strong>
                    Subtotal: ₹{calculateTotals().totalAmount.toFixed(2)}
                  </Text>
                  <Text strong>
                    Discount: ₹{calculateTotals().totalDiscount.toFixed(2)}
                  </Text>
                  <Text strong>
                    Finalized Total = ₹
                    {(
                      calculateTotals().totalAmount -
                      calculateTotals().totalDiscount
                    ).toFixed(2)}
                  </Text>
                  <Text strong>Profit: ₹{calculateTotals().profit?.toFixed(2) || 0}</Text>
                </Space>
              </Col>

              <Col span={12}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Select
                    style={{ width: "100%" }}
                    value={paymentMode}
                    onChange={(value) => setPaymentMode(value)}
                  >
                    <Option value="cash">Cash</Option>
                    <Option value="card">Card</Option>
                  </Select>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={paymentAmount}
                    onChange={(value) => setPaymentAmount(value)}
                    min={0}
                    step={0.01}
                    formatter={(value) =>
                      `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                  />
                  <Text strong>
                    Change: ₹
                    {Math.max(
                      0,
                      paymentAmount -
                        (calculateTotals().totalAmount -
                          calculateTotals().totalDiscount)
                    ).toFixed(2)}
                  </Text>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={editingInvoice ? updateInvoice : saveSale}
                    disabled={
                      saleItems.length === 0 ||
                      paymentAmount <
                        calculateTotals().totalAmount -
                          calculateTotals().totalDiscount ||
                      saving
                    }
                    style={{ width: "100%" }}
                  >
                    {editingInvoice ? "Update Invoice" : "Save and Print"}
                  </Button>
                  {editingInvoice && (
                    <Button
                      type="default"
                      onClick={cancelEdit}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      Cancel
                    </Button>
                  )}
                </Space>
              </Col>
            </Row>
          </Footer>
        </Card>

        <Drawer
          title="Saved Invoices"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          width={400}
        >
          <Table
            dataSource={savedInvoices}
            columns={[
              {
                title: "Invoice #",
                dataIndex: "invoiceNumber",
                key: "invoiceNumber",
              },
              {
                title: "Total Amount",
                dataIndex: "totalAmount",
                key: "totalAmount",
                render: (value) => `₹${value.toFixed(2)}`,
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (value) =>
                  new Date(value.seconds * 1000).toLocaleString(),
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <>
                    {/* <Button type="link" onClick={() => handleEditInvoice(record)}>Edit</Button> */}
                    <Button
                      type="link"
                      icon={<PrinterOutlined />}
                      onClick={() => printSavedInvoice(record)}
                    ></Button>
                  </>
                ),
              },
            ]}
            rowKey="id"
            pagination={false}
          />
        </Drawer>
        {saving && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </Content>
    </Layout>
  );
}