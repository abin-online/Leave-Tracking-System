import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../pages/user/Dashboard'
import Attendance from "../pages/user/Attendance";
import ApplyLeavePage from "../pages/user/ApplyLeave";
import LeaveHistoryPage from "../pages/user/LeaveHistory";
import Profile from "../pages/user/Profile"

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/attendance" element={<Attendance/>} />
      <Route path="/apply-leave" element={<ApplyLeavePage/>} />
      <Route path="/leave-history" element={<LeaveHistoryPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UserRoutes;

