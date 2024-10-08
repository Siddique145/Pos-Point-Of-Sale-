
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/signin";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
// import Products from "./pages/Admin/Products";
import Purchase from "./pages/Admin/Purchase";
import Reports from "./pages/Admin/Reports";
// import POS from "./pages/Pos/Pos";
import { AuthContext } from "./context/Auth";
import Transactions from "./pages/Transactions/Transactions";
import AddCategoryProfile from "./components/MasterItemProfile/AddCategoryProfile";
import AddGenericProfile from "./components/MasterItemProfile/AddGenericProfile";
import AddCompanyProfile from "./components/MasterItemProfile/AddCompanyProfile";
import AddDistributorProfile from "./components/MasterItemProfile/AddDistributorProfile";
import AddItemProfile from "./components/MasterItemProfile/AddItemProfile";
import EditItemProfile from "./components/MasterItemProfile/EditItemProfile";
import EditDistributorProfile from "./components/MasterItemProfile/EditDistributorProfile";
import EditCompanyProfile from "./components/MasterItemProfile/EditCompanyProfile";
import AddPurchase from "./components/Transactions/AddPurchase";
import ReturnPurchase from "./components/Transactions/ReturnPurchase";
import EditPurchase from "./components/Transactions/EditPurchase";
import GenerateOrder from "./components/Transactions/GenerateOrder";
import DateWiseSalesReport from "./components/Reports/DateWiseSaleReport";
import ExpiryDetector from "./components/Reports/ExpiryDetector";
import PurchaseOfCash from "./components/Reports/PurchaseOfCash";
import PurchaseOfBank from "./components/Reports/PurchaseOfBank";
import PaidInvoices from "./components/Reports/PaidInvoices";
import PosReturn from "./pages/Pos/Posreturn";
import PosDashboard from "./pages/Pos/PosDashboard";
import POS from "./pages/Pos/Pos";

function App() {
  const { user } = useContext(AuthContext);

  const getInitialRoute = () => {
    if (user?.isLogin) {
      switch (user?.role) {
        case "admin":
          return <Navigate to="/admin/users" />;
        case "counteruser":
          return <Navigate to="/counteruser/poscountersale" />;
        default:
          return <Navigate to="/pos" />;
      }
    } else {
      return <Navigate to="/signin" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={getInitialRoute()} />

        {/* Admin routes, protected */}
        <Route
          path="/admin"
          element={
            user?.isLogin && user?.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="addgenericprofile" element={<AddGenericProfile />} />
          <Route path="addcategoryprofile" element={<AddCategoryProfile />} />
          <Route path="addcompanyprofile" element={<AddCompanyProfile />} />
          <Route path="editcompanyprofile" element={<EditCompanyProfile />} />
          <Route
            path="adddistributorprofile"
            element={<AddDistributorProfile />}
          />
          <Route
            path="editdistributorprofile"
            element={<EditDistributorProfile />}
          />
          <Route path="additemprofile" element={<AddItemProfile />} />
          <Route path="edititemprofile" element={<EditItemProfile />} />
          <Route path="addpurchaseprofile" element={<AddPurchase />} />
          <Route path="returnpurchaseprofile" element={<ReturnPurchase />} />
          <Route path="editpurchaseprofile" element={<EditPurchase />} />
          <Route path="generateorder" element={<GenerateOrder />} />
          <Route path="poscountersale" element={<POS />} />
          <Route path="posreturn" element={<PosReturn />} />
          <Route path="datewisesalereport" element={<DateWiseSalesReport />} />
          <Route path="expirydetector" element={<ExpiryDetector />} />
          <Route path="purchaseofcash" element={<PurchaseOfCash />} />
          <Route path="purchaseofbank" element={<PurchaseOfBank />} />
          <Route path="paidinvoices" element={<PaidInvoices />} />
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="purchases" element={<Purchase />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Counter User route */}
        {/* <Route
          path="/counteruser"
          element={
            user?.isLogin && user?.role === "counteruser" ? (
              <PosDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

       <Route
          path="/counteruser/"
          element={
            user?.isLogin && user?.role === "counteruser" ? (
              <PosDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        >
        <Route path="poscountersale" element={<POS />} />
        <Route path="posreturn" element={<PosReturn />} />


        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
