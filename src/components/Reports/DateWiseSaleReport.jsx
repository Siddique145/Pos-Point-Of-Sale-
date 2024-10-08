
// import React, { useState, useEffect } from 'react';
// import {
//   Layout,
//   Card,
//   DatePicker,
//   Button,
//   Table,
//   Typography,
//   Row,
//   Col,
//   Statistic,
// } from 'antd';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../utilis/firebase';

// const { Header, Content } = Layout;
// const { Title } = Typography;
// const { RangePicker } = DatePicker;

// export default function SalesReport() {
//   const [aggregatedData, setAggregatedData] = useState([]);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [loading, setLoading] = useState(false);

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Total Sales',
//       dataIndex: 'totalSales',
//       key: 'totalSales',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Returns',
//       dataIndex: 'totalReturns',
//       key: 'totalReturns',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Profit',
//       dataIndex: 'totalProfit',
//       key: 'totalProfit',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Purchase Cost',
//       dataIndex: 'totalPurchaseCost',
//       key: 'totalPurchaseCost',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//   ];

//   const fetchSalesData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const salesRef = collection(db, 'sales');
//       let salesQuery = query(salesRef);

//       if (startDate && endDate) {
//         salesQuery = query(
//           salesRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const salesSnapshot = await getDocs(salesQuery);
//       return salesSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//       return [];
//     }
//   };

//   const fetchReturnsData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const returnsRef = collection(db, 'returns');
//       let returnsQuery = query(returnsRef);

//       if (startDate && endDate) {
//         returnsQuery = query(
//           returnsRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const returnsSnapshot = await getDocs(returnsQuery);
//       return returnsSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching returns data:', error);
//       return [];
//     }
//   };

//   const aggregateData = (sales, returns) => {
//     const aggregated = {};

//     sales.forEach(({ date, totalAmount, profit, totalCost }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalSales += typeof totalAmount === 'number' ? totalAmount : 0;
//       aggregated[date].totalProfit += typeof profit === 'number' ? profit : 0;
//       aggregated[date].totalPurchaseCost += typeof totalCost === 'number' ? totalCost : 0;
//     });

//     returns.forEach(({ date, totalAmount }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalReturns += typeof totalAmount === 'number' ? totalAmount : 0;
//     });

//     return Object.entries(aggregated).map(([date, totals]) => ({ date, ...totals }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const sales = await fetchSalesData();
//       const returns = await fetchReturnsData();
//       const aggregated = aggregateData(sales, returns);
//       setAggregatedData(aggregated);
//       setLoading(false);
//     };

//     if (dateRange[0] && dateRange[1]) {
//       fetchData();
//     }
//   }, [dateRange]);

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header style={{ background: '#fff', padding: '0 20px' }}>
//         <Title level={2}>Sales Report</Title>
//       </Header>
//       <Content style={{ padding: '20px' }}>
//         <Card>
//           <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
//             <Col span={16}>
//               <RangePicker
//                 style={{ width: '100%' }}
//                 value={dateRange}
//                 onChange={handleDateRangeChange}
//               />
//             </Col>
//             <Col span={8}>
//               <Button
//                 type="primary"
//                 onClick={() => setDateRange(dateRange)} // Trigger effect
//                 style={{ width: '100%' }}
//               >
//                 Generate Report
//               </Button>
//             </Col>
//           </Row>
//           <Table
//             columns={columns}
//             dataSource={aggregatedData}
//             rowKey="date"
//             loading={loading}
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: true }}
//           />
//         </Card>
//       </Content>
//     </Layout>
//   );
// } 






























// import React, { useState, useEffect } from 'react';
// import {
//   Layout,
//   Card,
//   DatePicker,
//   Button,
//   Table,
//   Typography,
//   Row,
//   Col,
// } from 'antd';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../utilis/firebase';

// const { Header, Content } = Layout;
// const { Title } = Typography;
// const { RangePicker } = DatePicker;

// export default function SalesReport() {
//   const [aggregatedData, setAggregatedData] = useState([]);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [loading, setLoading] = useState(false);

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Total Sales',
//       dataIndex: 'totalSales',
//       key: 'totalSales',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Returns',
//       dataIndex: 'totalReturns',
//       key: 'totalReturns',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Finalized Sale',
//       dataIndex: 'finalizedSale',
//       key: 'finalizedSale',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Profit',
//       dataIndex: 'totalProfit',
//       key: 'totalProfit',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Purchase Cost',
//       dataIndex: 'totalPurchaseCost',
//       key: 'totalPurchaseCost',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//   ];

//   const fetchSalesData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const salesRef = collection(db, 'sales');
//       let salesQuery = query(salesRef);

//       if (startDate && endDate) {
//         salesQuery = query(
//           salesRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const salesSnapshot = await getDocs(salesQuery);
//       return salesSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReturnsData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const returnsRef = collection(db, 'returns');
//       let returnsQuery = query(returnsRef);

//       if (startDate && endDate) {
//         returnsQuery = query(
//           returnsRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const returnsSnapshot = await getDocs(returnsQuery);
//       return returnsSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching returns data:', error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const aggregateData = (sales, returns) => {
//     const aggregated = {};

//     sales.forEach(({ date, totalAmount, profit, totalCost }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalSales += typeof totalAmount === 'number' ? totalAmount : 0;
//       aggregated[date].totalProfit += typeof profit === 'number' ? profit : 0;
//       aggregated[date].totalPurchaseCost += typeof totalCost === 'number' ? totalCost : 0;
//     });

//     returns.forEach(({ date, totalAmount, profit }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalReturns += typeof totalAmount === 'number' ? Math.abs(totalAmount) : 0; // Returns are typically negative
//       aggregated[date].totalProfit -= typeof profit === 'number' ? profit : 0; // Deduct profit from returns
//     });

//     return Object.entries(aggregated).map(([date, totals]) => ({ date, ...totals }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const sales = await fetchSalesData();
//       const returns = await fetchReturnsData();
//       const aggregated = aggregateData(sales, returns);
//       setAggregatedData(aggregated);
//       setLoading(false);
//     };

//     if (dateRange[0] && dateRange[1]) {
//       fetchData();
//     }
//   }, [dateRange]);

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header style={{ background: '#fff', padding: '0 20px' }}>
//         <Title level={2}>Sales Report</Title>
//       </Header>
//       <Content style={{ padding: '20px' }}>
//         <Card>
//           <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
//             <Col span={16}>
//               <RangePicker
//                 style={{ width: '100%' }}
//                 value={dateRange}
//                 onChange={handleDateRangeChange}
//               />
//             </Col>
//             <Col span={8}>
//               <Button
//                 type="primary"
//                 onClick={() => setDateRange(dateRange)} // Trigger effect
//                 style={{ width: '100%' }}
//               >
//                 Generate Report
//               </Button>
//             </Col>
//           </Row>
//           <Table
//             columns={columns}
//             dataSource={aggregatedData}
//             rowKey="date"
//             loading={loading}
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: true }}
//           />
//         </Card>
//       </Content>
//     </Layout>
//   );
// }
























// import React, { useState, useEffect } from 'react';
// import {
//   Layout,
//   Card,
//   DatePicker,
//   Button,
//   Table,
//   Typography,
//   Row,
//   Col,
// } from 'antd';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../utilis/firebase';

// const { Header, Content } = Layout;
// const { Title } = Typography;
// const { RangePicker } = DatePicker;

// export default function SalesReport() {
//   const [aggregatedData, setAggregatedData] = useState([]);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [loading, setLoading] = useState(false);

//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Total Sales',
//       dataIndex: 'totalSales',
//       key: 'totalSales',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Sale Profit',
//       dataIndex: 'TotalSaleProfit',
//       key: 'Total Sale Profit',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Returns',
//       dataIndex: 'totalReturns',
//       key: 'totalReturns',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Returns Profit',
//       dataIndex: 'TotalReturnsProfit',
//       key: 'TotalReturnsProfit',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Finalized Sale',
//       dataIndex: 'finalizedSale',
//       key: 'finalizedSale',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Finalized  Profit',
//       dataIndex: 'Finalized  Profit',
//       key: 'Finalized  Profit',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//     {
//       title: 'Total Purchase Cost',
//       dataIndex: 'totalPurchaseCost',
//       key: 'totalPurchaseCost',
//       render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
//     },
//   ];

//   const fetchSalesData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const salesRef = collection(db, 'sales');
//       let salesQuery = query(salesRef);

//       if (startDate && endDate) {
//         salesQuery = query(
//           salesRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const salesSnapshot = await getDocs(salesQuery);
//       return salesSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReturnsData = async () => {
//     setLoading(true);
//     const [startDate, endDate] = dateRange;

//     try {
//       const returnsRef = collection(db, 'returns');
//       let returnsQuery = query(returnsRef);

//       if (startDate && endDate) {
//         returnsQuery = query(
//           returnsRef,
//           where('createdAt', '>=', startDate.startOf('day').toDate()),
//           where('createdAt', '<=', endDate.endOf('day').toDate())
//         );
//       }

//       const returnsSnapshot = await getDocs(returnsQuery);
//       return returnsSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         date: doc.data().createdAt.toDate().toLocaleDateString(),
//       }));
//     } catch (error) {
//       console.error('Error fetching returns data:', error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const aggregateData = (sales, returns) => {
//     const aggregated = {};

//     sales.forEach(({ date, totalAmount, profit, totalCost }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalSales += typeof totalAmount === 'number' ? totalAmount : 0;
//       aggregated[date].totalProfit += typeof profit === 'number' ? profit : 0;
//       aggregated[date].totalPurchaseCost += typeof totalCost === 'number' ? totalCost : 0;
//     });

//     returns.forEach(({ date, totalAmount, profit }) => {
//       if (!aggregated[date]) {
//         aggregated[date] = { totalSales: 0, totalReturns: 0, totalProfit: 0, totalPurchaseCost: 0 };
//       }
//       aggregated[date].totalReturns += typeof totalAmount === 'number' ? Math.abs(totalAmount) : 0; // Returns are typically negative
//       aggregated[date].totalProfit -= typeof profit === 'number' ? profit : 0; // Deduct profit from returns
//     });

//     // Calculate finalized sales and adjusted profit
//     return Object.entries(aggregated).map(([date, totals]) => ({
//       date,
//       totalSales: totals.totalSales,
//       totalReturns: totals.totalReturns,
//       finalizedSale: totals.totalSales - totals.totalReturns,
//       totalProfit: totals.totalProfit,
//       totalPurchaseCost: totals.totalPurchaseCost,
//     }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const sales = await fetchSalesData();
//       const returns = await fetchReturnsData();
//       const aggregated = aggregateData(sales, returns);
//       setAggregatedData(aggregated);
//       setLoading(false);
//     };

//     if (dateRange[0] && dateRange[1]) {
//       fetchData();
//     }
//   }, [dateRange]);

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header style={{ background: '#fff', padding: '0 20px' }}>
//         <Title level={2}>Sales Report</Title>
//       </Header>
//       <Content style={{ padding: '20px' }}>
//         <Card>
//           <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
//             <Col span={16}>
//               <RangePicker
//                 style={{ width: '100%' }}
//                 value={dateRange}
//                 onChange={handleDateRangeChange}
//               />
//             </Col>
//             <Col span={8}>
//               <Button
//                 type="primary"
//                 onClick={() => setDateRange(dateRange)} // Trigger effect
//                 style={{ width: '100%' }}
//               >
//                 Generate Report
//               </Button>
//             </Col>
//           </Row>
//           <Table
//             columns={columns}
//             dataSource={aggregatedData}
//             rowKey="date"
//             loading={loading}
//             pagination={{ pageSize: 10 }}
//             scroll={{ x: true }}
//           />
//         </Card>
//       </Content>
//     </Layout>
//   );
// }












import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  DatePicker,
  Button,
  Table,
  Typography,
  Row,
  Col,
} from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../utilis/firebase';

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function SalesReport() {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Sales',
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Total Sale Profit',
      dataIndex: 'totalSaleProfit',
      key: 'totalSaleProfit',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Total Returns',
      dataIndex: 'totalReturns',
      key: 'totalReturns',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Total Returns Profit',
      dataIndex: 'totalReturnsProfit',
      key: 'totalReturnsProfit',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Finalized Sale',
      dataIndex: 'finalizedSale',
      key: 'finalizedSale',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Finalized Profit',
      dataIndex: 'finalizedProfit',
      key: 'finalizedProfit',
      render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    },
    // {
    //   title: 'Total Purchase Cost',
    //   dataIndex: 'totalPurchaseCost',
    //   key: 'totalPurchaseCost',
    //   render: (value) => (typeof value === 'number' ? `₹${value.toFixed(2)}` : 'N/A'),
    // },
  ];

  const fetchSalesData = async () => {
    setLoading(true);
    const [startDate, endDate] = dateRange;

    try {
      const salesRef = collection(db, 'sales');
      let salesQuery = query(salesRef);

      if (startDate && endDate) {
        salesQuery = query(
          salesRef,
          where('createdAt', '>=', startDate.startOf('day').toDate()),
          where('createdAt', '<=', endDate.endOf('day').toDate())
        );
      }

      const salesSnapshot = await getDocs(salesQuery);
      return salesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        date: doc.data().createdAt.toDate().toLocaleDateString(),
      }));
    } catch (error) {
      console.error('Error fetching sales data:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchReturnsData = async () => {
    setLoading(true);
    const [startDate, endDate] = dateRange;

    try {
      const returnsRef = collection(db, 'returns');
      let returnsQuery = query(returnsRef);

      if (startDate && endDate) {
        returnsQuery = query(
          returnsRef,
          where('createdAt', '>=', startDate.startOf('day').toDate()),
          where('createdAt', '<=', endDate.endOf('day').toDate())
        );
      }

      const returnsSnapshot = await getDocs(returnsQuery);
      return returnsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        date: doc.data().createdAt.toDate().toLocaleDateString(),
      }));
    } catch (error) {
      console.error('Error fetching returns data:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const aggregateData = (sales, returns) => {
    const aggregated = {};

    sales.forEach(({ date, totalAmount, profit, totalCost }) => {
      if (!aggregated[date]) {
        aggregated[date] = { totalSales: 0, totalSaleProfit: 0, totalReturns: 0, totalReturnsProfit: 0, totalPurchaseCost: 0 };
      }
      aggregated[date].totalSales += typeof totalAmount === 'number' ? totalAmount : 0;
      aggregated[date].totalSaleProfit += typeof profit === 'number' ? profit : 0;
      aggregated[date].totalPurchaseCost += typeof totalCost === 'number' ? totalCost : 0;
    });

    returns.forEach(({ date, totalAmount, profit }) => {
      if (!aggregated[date]) {
        aggregated[date] = { totalSales: 0, totalSaleProfit: 0, totalReturns: 0, totalReturnsProfit: 0, totalPurchaseCost: 0 };
      }
      aggregated[date].totalReturns += typeof totalAmount === 'number' ? Math.abs(totalAmount) : 0; // Returns are typically negative
      aggregated[date].totalReturnsProfit += typeof profit === 'number' ? Math.abs(profit) : 0; // Treat returns profit as a positive value
    });

    // Calculate finalized sales and adjusted profit
    return Object.entries(aggregated).map(([date, totals]) => ({
      date,
      totalSales: totals.totalSales,
      totalSaleProfit: totals.totalSaleProfit,
      totalReturns: totals.totalReturns,
      totalReturnsProfit: totals.totalReturnsProfit,
      finalizedSale: totals.totalSales - totals.totalReturns,
      finalizedProfit: totals.totalSaleProfit - totals.totalReturnsProfit,
      totalPurchaseCost: totals.totalPurchaseCost,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const sales = await fetchSalesData();
      const returns = await fetchReturnsData();
      const aggregated = aggregateData(sales, returns);
      setAggregatedData(aggregated);
      setLoading(false);
    };

    if (dateRange[0] && dateRange[1]) {
      fetchData();
    }
  }, [dateRange]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <Title level={2}>Sales Report</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            <Col span={16}>
              <RangePicker
                style={{ width: '100%' }}
                value={dateRange}
                onChange={handleDateRangeChange}
              />
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                onClick={() => setDateRange(dateRange)} // Trigger effect
                style={{ width: '100%' }}
              >
                Generate Report
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={aggregatedData}
            rowKey="date"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Card>
      </Content>
    </Layout>
  );
}
