import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import LoginPage from "./components/login/LoginPage";
import Navbar from "./components/commonComonents/Navbar";
import SuperAdminDashboard from "./components/superAdmin/SuperAdminDashboard";
import CompanyForm from "./components/superAdmin/CompanyForm";
import AdminDetails from "./components/superAdmin/AdminDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import ManagerDashBoard from "./pages/ManagerDashBoard";

// ✅ Move this to a component rendered inside BrowserRouter
function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/unauthorized'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/:id" element={<AdminDetails />} />
          <Route path="/super-admin/add-company" element={<CompanyForm />} />
          <Route path="/manager" element={<ManagerDashBoard />} />
        </Route>
      </Routes>
    </>
  );
}

// ✅ This is the root component, now safely wraps AppContent inside BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
