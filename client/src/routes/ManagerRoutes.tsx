import { Routes, Route, Navigate } from "react-router-dom";
import ManagerDashboard from "../pages/manager/ManagerDashboard";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/manager" element={<ManagerDashboard/>} />
      <Route path="*" element={<Navigate to="/manager" />} />
    </Routes>
  );
};

export default ManagerRoutes;
