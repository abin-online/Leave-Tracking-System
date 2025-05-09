import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSettings from "../pages/admin/AdminSettings";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default ManagerRoutes;
