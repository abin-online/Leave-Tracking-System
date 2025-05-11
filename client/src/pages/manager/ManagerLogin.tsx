import LoginPage from "../../components/Login";
import { managerLogin } from "../../api/auth";

const ManagerLogin = () => {
  return (
    <>
      <LoginPage role="manager" handleLogin={managerLogin}/>
    </>
  );
};

export default ManagerLogin;
