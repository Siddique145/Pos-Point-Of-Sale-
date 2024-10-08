import React, { useState } from "react";
import {
  Card,
  DatePicker,
  Button,
  Table,
  message,
  Typography,
  Row,
  Col,
  Statistic,
} from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utilis/firebase";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const PaidInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  const fetchDistributors = async () => {
    const distributorsRef = collection(db, "distributors");
    const snapshot = await getDocs(distributorsRef);
    return snapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().name;
      return acc;
    }, {});
  };

  const fetchInvoices = async (startDate, endDate) => {
    setLoading(true);
    try {
      const invoicesRef = collection(db, "purchases");
      const q = query(
        invoicesRef,
        where("isPaid", "==", true),
        where("Payinginvoicetime", ">=", startDate),
        where("Payinginvoicetime", "<=", endDate)
      );

      const snapshot = await getDocs(q);
      const invoicesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        payingInvoiceTime: doc.data().Payinginvoicetime.toDate(),
        purchaseSaveTime: doc.data().date.toDate(),
      }));

      const distributorNames = await fetchDistributors();

      const invoicesWithDistributorNames = invoicesList.map((invoice) => ({
        ...invoice,
        distributorId: distributorNames[invoice.distributorId] || "Unknown",
      }));

      setInvoices(invoicesWithDistributorNames);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      message.error("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseReturns = async (startDate, endDate) => {
    setLoading(true);
    try {
      const purchaseReturnsRef = collection(db, "purchaseReturns");
      const q = query(
        purchaseReturnsRef,
        where("isPaid", "==", true),
        where("Payinginvoicetime", ">=", startDate),
        where("Payinginvoicetime", "<=", endDate)
      );

      const snapshot = await getDocs(q);
      const purchaseReturnsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        payingInvoiceTime: doc.data().Payinginvoicetime.toDate(),
        purchaseSaveTime: doc.data().date.toDate(),
      }));

      const distributorNames = await fetchDistributors();

      const purchaseReturnsListWithDistributorNames = purchaseReturnsList.map(
        (purchaseReturn) => ({
          ...purchaseReturn,
          distributorId:
            distributorNames[purchaseReturn.distributorId] || "Unknown",
        })
      );

      setPurchaseReturns(purchaseReturnsListWithDistributorNames);
    } catch (error) {
      console.error("Error fetching purchase returns:", error);
      message.error("Failed to fetch purchase returns");
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleFetchInvoices = () => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf("day").toDate();
      const endDate = dateRange[1].endOf("day").toDate();
      fetchInvoices(startDate, endDate);
      fetchPurchaseReturns(startDate, endDate);
    } else {
      message.warning("Please select a date range.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : "N/A";
    const endDate = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : "N/A";

    doc.text("Paid Invoices Report", 14, 15);
    doc.text(`Report Date Range: ${startDate} to ${endDate}`, 14, 25);

    const tableColumn = [
      "Date Paid",
      "Purchase Date",
      "Distributor",
      "Invoice Number",
      "Total",
      "Payment Method",
    ];
    const tableRows = [...invoices, ...purchaseReturns].map((invoice) => [
      moment(invoice.payingInvoiceTime).format("YYYY-MM-DD HH:mm"),
      moment(invoice.purchaseSaveTime).format("YYYY-MM-DD HH:mm"),
      invoice.distributorId,
      invoice.invoiceNumber,
      `$${invoice.totals.netAmount.toFixed(2)}`,
      invoice.paymentMethod,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    const totalCash = [...invoices, ...purchaseReturns]
      .filter((inv) => inv.paymentMethod === "cash")
      .reduce((sum, inv) => sum + inv.totals.netAmount, 0);
    const totalCheque = [...invoices, ...purchaseReturns]
      .filter((inv) => inv.paymentMethod === "cheque")
      .reduce((sum, inv) => sum + inv.totals.netAmount, 0);

    const finalY = doc.lastAutoTable.finalY || 35;
    doc.text(`Total Cash Paid: $${totalCash.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total Cheque Paid: $${totalCheque.toFixed(2)}`, 14, finalY + 20);
    doc.text(
      `Total Invoices: ${invoices.length + purchaseReturns.length}`,
      14,
      finalY + 30
    );

    doc.save("paid_invoices_report.pdf");
  };

  const columns = [
    {
      title: "Date Paid",
      dataIndex: "payingInvoiceTime",
      key: "payingInvoiceTime",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseSaveTime",
      key: "purchaseSaveTime",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Distributor",
      dataIndex: "distributorId",
      key: "distributorId",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Total",
      dataIndex: ["totals", "netAmount"],
      key: "total",
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) =>
        method ? method.charAt(0).toUpperCase() + method.slice(1) : "N/A",
    },
  ];

  const totalCash = [...invoices, ...purchaseReturns]
    .filter((inv) => inv.paymentMethod === "cash")
    .reduce((sum, inv) => sum + inv.totals.netAmount, 0);
  const totalCheque = [...invoices, ...purchaseReturns]
    .filter((inv) => inv.paymentMethod === "cheque")
    .reduce((sum, inv) => sum + inv.totals.netAmount, 0);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Title level={2}>Paid Invoices</Title>
      <Row gutter={16} className="mb-4">
        <Col span={16}>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={handleDateRangeChange}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={handleFetchInvoices}
            style={{ width: "100%" }}
          >
            Fetch Invoices
          </Button>
        </Col>
        <Col span={4}>
          <Button onClick={generatePDF} style={{ width: "100%" }}>
            Print Report
          </Button>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Cash Paid"
              value={totalCash}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Cheque Paid"
              value={totalCheque}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Invoices"
              value={invoices.length + purchaseReturns.length}
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={[...invoices, ...purchaseReturns]}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default PaidInvoices;
