import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux"; // ← import Provider
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor, type RootState } from "./store"; // ← now actually used
import { clearUser } from "./store/user/userSlice";
import AdminRoutes from "./routes/AdminRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import ManagerLogin from "./pages/manager/ManagerLogin";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";

// … your page components (UserPage, AdminLoginPage, etc.) …

const AppRoutes = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup/>} />
        <Route path="/" element={<Navigate to="/user-login" />} />
      </Routes>

      {/* Role-based private routes - move these OUTSIDE the Routes block */}
      {role === "admin" && <AdminRoutes />}
      {role === "manager" && <ManagerRoutes />}
      {role === "user" && <UserRoutes />}
    </Router>
  );
};


const App = () => (
  <Provider store={store}>
    {" "}
    {/* ← <Provider> uses your store */}
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);

export default App;
