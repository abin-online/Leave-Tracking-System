import LoginPage from "../../components/Login";
import { adminLogin } from "../../api/auth";

const AdminLogin = () => {
  return (
    <>
      <LoginPage role='admin' handleLogin={adminLogin}/>
    </>
  );
};

export default AdminLogin;
