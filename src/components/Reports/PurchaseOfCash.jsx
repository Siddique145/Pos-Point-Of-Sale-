import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Select, Table, message, Input } from "antd";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  writeBatch,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../utilis/firebase"; // Adjust the import path accordingly

const PurchaseOfCash = () => {
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [selectedPurchaseReturns, setSelectedPurchaseReturns] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState("");

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const distributorsRef = collection(db, "distributors");
      const snapshot = await getDocs(distributorsRef);
      const distributorsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setDistributors(distributorsList);
    } catch (error) {
      console.error("Error fetching distributors:", error);
      message.error("Failed to fetch distributors");
    }
  };

  const fetchInvoices = async (distributorId) => {
    setLoading(true);
    try {
      const invoicesRef = collection(db, "purchases");
      const q = query(invoicesRef, where("distributorId", "==", distributorId));
      const snapshot = await getDocs(q);
      const invoicesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date.toDate().toLocaleDateString(),
        distributorId: doc.data().distributorId,
        distributorName:
          distributors.find((d) => d.id === doc.data().distributorId)?.name ||
          "Unknown",
        invoiceNumber: doc.data().invoiceNumber,
        total: doc.data().totals.netAmount,
        isPaid: doc.data().isPaid || false,
        paymentMethod: doc.data().paymentMethod || "cash",
        Payinginvoicetime: doc.data().Payinginvoicetime || null, // Include payment time
      }));
      setInvoices(invoicesList);
      setSelectedInvoices([]);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      message.error("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseReturns = async (distributorId) => {
    setLoading(true);
    try {
      const purchaseReturnsRef = collection(db, "purchaseReturns");
      const q = query(
        purchaseReturnsRef,
        where("distributorId", "==", distributorId)
      );
      const snapshot = await getDocs(q);
      const purchaseReturnsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        date: doc.data().date.toDate().toLocaleDateString(),
        distributorId: doc.data().distributorId,
        distributorName:
          distributors.find((d) => d.id === doc.data().distributorId)?.name ||
          "Unknown",
        invoiceNumber: doc.data().invoiceNumber,
        total: doc.data().totals.netAmount,
        isPaid: doc.data().isPaid || false,
        paymentMethod: doc.data().paymentMethod || "cash",
        Payinginvoicetime: doc.data().Payinginvoicetime || null, // Include payment time
      }));
      setPurchaseReturns(purchaseReturnsList);
      setSelectedPurchaseReturns([]);
    } catch (error) {
      console.error("Error fetching purchase returns:", error);
      message.error("Failed to fetch purchase returns");
    } finally {
      setLoading(false);
    }
  };

  const handleDistributorChange = (value) => {
    setSelectedDistributor(value);
    fetchInvoices(value);
    fetchPurchaseReturns(value);
  };

  const handlePaymentStatusChange = (invoiceId) => {
    setSelectedInvoices((prev) => {
      if (prev.includes(invoiceId)) {
        return prev.filter((id) => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  const handlePurchaseReturnStatusChange = (purchaseReturnId) => {
    setSelectedPurchaseReturns((prev) => {
      if (prev.includes(purchaseReturnId)) {
        return prev.filter((id) => id !== purchaseReturnId);
      } else {
        return [...prev, purchaseReturnId];
      }
    });
  };

  const handleSaveInvoices = async () => {
    if (selectedInvoices.length === 0) {
      message.warning("No invoices selected.");
      return;
    }

    const batch = writeBatch(db);
    const currentTimestamp = Timestamp.now(); // Get current timestamp for payment time

    try {
      selectedInvoices.forEach(async (invoiceId) => {
        const invoiceRef = doc(db, "purchases", invoiceId);
        batch.update(invoiceRef, {
          isPaid: true,
          paymentMethod: "cash",
          Payinginvoicetime: currentTimestamp, // Save current timestamp
        });

        const invoiceDoc = await getDoc(invoiceRef);
        if (invoiceDoc.exists()) {
          const invoiceData = invoiceDoc.data();
          const reportRef = doc(collection(db, "PurchaseReport")); // Automatically generate ID
          batch.set(reportRef, {
            distributorId: invoiceData.distributorId,
            date: Timestamp.now(), // Save current timestamp as purchase date
            createdAt: Timestamp.now(),
            total: invoiceData.totals.netAmount,
            isPaid: true,
            paymentMethod: "cash",
            Payinginvoicetime: currentTimestamp, // Save payment time
          });
        }
      });

      await batch.commit();
      message.success("Invoices saved successfully!");
      setSelectedInvoices([]);
      fetchInvoices(selectedDistributor);
    } catch (error) {
      console.error("Error saving invoices:", error);
      message.error("Failed to save invoices");
    }
  };

  const handleSavePurchaseReturns = async () => {
    if (selectedPurchaseReturns.length === 0) {
      message.warning("No purchase returns selected.");
      return;
    }

    const batch = writeBatch(db);
    const currentTimestamp = Timestamp.now(); // Get current timestamp for payment time

    try {
      selectedPurchaseReturns.forEach(async (purchaseReturnId) => {
        const purchaseReturnRef = doc(db, "purchaseReturns", purchaseReturnId);
        batch.update(purchaseReturnRef, {
          isPaid: true,
          paymentMethod: "cash",
          Payinginvoicetime: currentTimestamp, // Save current timestamp
        });

        const purchaseReturnDoc = await getDoc(purchaseReturnRef);
        if (purchaseReturnDoc.exists()) {
          const purchaseReturnData = purchaseReturnDoc.data();
          const reportRef = doc(collection(db, "PurchaseReturnReport")); // Automatically generate ID
          batch.set(reportRef, {
            distributorId: purchaseReturnData.distributorId,
            date: Timestamp.now(), // Save current timestamp as purchase return date
            createdAt: Timestamp.now(),
            total: purchaseReturnData.totals.netAmount,
            isPaid: true,
            paymentMethod: "cash",
            Payinginvoicetime: currentTimestamp, // Save payment time
          });
        }
      });

      await batch.commit();
      message.success("Purchase returns saved successfully!");
      setSelectedPurchaseReturns([]);
      fetchPurchaseReturns(selectedDistributor);
    } catch (error) {
      console.error("Error saving purchase returns:", error);
      message.error("Failed to save purchase returns");
    }
  };

  const selectedTotal = selectedInvoices.reduce((total, invoiceId) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    return total + (invoice ? invoice.total : 0);
  }, 0);

  const selectedPurchaseReturnTotal = selectedPurchaseReturns.reduce(
    (total, purchaseReturnId) => {
      const purchaseReturn = purchaseReturns.find(
        (pr) => pr.id === purchaseReturnId
      );
      return total + (purchaseReturn ? purchaseReturn.total : 0);
    },
    0
  );

  const unpaidInvoices = invoices.filter(
    (inv) => !inv.isPaid && inv.paymentMethod === "cash"
  );
  const cashPaidInvoices = invoices.filter(
    (inv) => inv.isPaid && inv.paymentMethod === "cash"
  );

  const unpaidPurchaseReturns = purchaseReturns.filter(
    (pr) => !pr.isPaid && pr.paymentMethod === "cash"
  );
  const cashPaidPurchaseReturns = purchaseReturns.filter(
    (pr) => pr.isPaid && pr.paymentMethod === "cash"
  );

  const filteredCashPaidInvoices = cashPaidInvoices.filter((inv) => {
    const matchesDate = inv.date.includes(searchDate);
    const matchesInvoiceNumber =
      inv.invoiceNumber.includes(searchInvoiceNumber);
    return matchesDate && matchesInvoiceNumber;
  });

  const filteredCashPaidPurchaseReturns = cashPaidPurchaseReturns.filter(
    (pr) => {
      const matchesDate = pr.date.includes(searchDate);
      const matchesInvoiceNumber =
        pr.invoiceNumber.includes(searchInvoiceNumber);
      return matchesDate && matchesInvoiceNumber;
    }
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Distributor",
      dataIndex: "distributorName",
      key: "distributorName",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: "Payment Time",
      dataIndex: "Payinginvoicetime", // Add new column for payment time
      key: "Payinginvoicetime",
      render: (time) =>
        time ? new Date(time.seconds * 1000).toLocaleString() : "N/A", // Format timestamp
    },
    {
      title: "Payment Status",
      key: "paymentStatus",
      render: (_, record) =>
        record.isPaid ? (
          <span>Cash Paid</span>
        ) : (
          <Checkbox
            checked={selectedInvoices.includes(record.id)}
            onChange={() => handlePaymentStatusChange(record.id)}
          />
        ),
    },
  ];

  const purchaseReturnColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Distributor",
      dataIndex: "distributorName",
      key: "distributorName",
    },
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: "Payment Time",
      dataIndex: "Payinginvoicetime", // Add new column for payment time
      key: "Payinginvoicetime",
      render: (time) =>
        time ? new Date(time.seconds * 1000).toLocaleString() : "N/A", // Format timestamp
    },
    {
      title: "Payment Status",
      key: "paymentStatus",
      render: (_, record) =>
        record.isPaid ? (
          <span>Cash Paid</span>
        ) : (
          <Checkbox
            checked={selectedPurchaseReturns.includes(record.id)}
            onChange={() => handlePurchaseReturnStatusChange(record.id)}
          />
        ),
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Purchase of Cash</h1>
      <div className="mb-4">
        <Select
          placeholder="Search and select distributor"
          style={{ width: "100%" }}
          showSearch
          value={selectedDistributor}
          onChange={handleDistributorChange}
          filterOption={(input, option) =>
            option?.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {distributors.map((distributor) => (
            <Select.Option key={distributor.id} value={distributor.id}>
              {distributor.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="mb-4">
        <Button
          type="primary"
          onClick={handleSaveInvoices}
          style={{ marginLeft: "10px" }}
        >
          Save Invoices
        </Button>
        <Button
          type="primary"
          onClick={handleSavePurchaseReturns}
          style={{ marginLeft: "10px" }}
        >
          Save Purchase Returns
        </Button>
      </div>
      <h2 className="text-lg font-semibold mb-2">
        Total Selected Invoices Amount: ${selectedTotal.toFixed(2)}
      </h2>
      <h2 className="text-lg font-semibold mb-2">
        Total Selected Purchase Returns Amount: $
        {selectedPurchaseReturnTotal.toFixed(2)}
      </h2>
      <h2 className="text-lg font-semibold mb-2">Unpaid Invoices</h2>
      <Table
        columns={columns}
        dataSource={unpaidInvoices}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <h2 className="text-lg font-semibold mb-2">Unpaid Purchase Returns</h2>
      <Table
        columns={purchaseReturnColumns}
        dataSource={unpaidPurchaseReturns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <h2 className="text-lg font-semibold mb-2">Cash Paid Invoices</h2>
      <Input
        placeholder="Search by Date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Input
        placeholder="Search by Invoice Number"
        value={searchInvoiceNumber}
        onChange={(e) => setSearchInvoiceNumber(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredCashPaidInvoices}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        footer={() => (
          <div>
            Total Cash Paid: $
            {filteredCashPaidInvoices
              .reduce((total, inv) => total + inv.total, 0)
              .toFixed(2)}
          </div>
        )}
      />
      <h2 className="text-lg font-semibold mb-2">Cash Paid Purchase Returns</h2>
      <Table
        columns={purchaseReturnColumns}
        dataSource={filteredCashPaidPurchaseReturns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        footer={() => (
          <div>
            Total Cash Paid: $
            {filteredCashPaidPurchaseReturns
              .reduce((total, pr) => total + pr.total, 0)
              .toFixed(2)}
          </div>
        )}
      />
    </Card>
  );
};

export default PurchaseOfCash;
