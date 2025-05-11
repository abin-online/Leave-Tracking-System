import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux"; // ← import Provider
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor, type RootState } from "./store/store"; // ← now actually used
import AdminRoutes from "./routes/AdminRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import ManagerLogin from "./pages/manager/ManagerLogin";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import OtpPage from "./pages/user/OtpPage";
import PublicRoute from "./routes/PublicRoutes";

const AppRoutes = () => {
  const role = useSelector((state: RootState) => state.user.role);
  console.log(role);

  return (
    <Router>
      <Routes>
        {/* Public routes wrapped */}
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/manager-login"
          element={
            <PublicRoute>
              <ManagerLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/user-login"
          element={
            <PublicRoute>
              <UserLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/user-signup"
          element={
            <PublicRoute>
              <UserSignup />
            </PublicRoute>
          }
        />
        <Route
          path="/submit-otp"
          element={
            <PublicRoute>
              <OtpPage />
            </PublicRoute>
          }
        />

        {/* Protected routes as before */}
        {role === "admin" && (
          <Route path="/admin/*" element={<AdminRoutes />} />
        )}
        {role === "manager" && (
          <Route path="/manager/*" element={<ManagerRoutes />} />
        )}
        {role === "employee" && <Route path="/*" element={<UserRoutes />} />}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/user-login" />} />
      </Routes>
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);

export default App;
