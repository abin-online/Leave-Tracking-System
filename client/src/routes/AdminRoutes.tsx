import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboardPage from "../pages/admin/AdminDashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default AdminRoutes;
