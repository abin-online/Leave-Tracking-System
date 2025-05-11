import LoginPage from "../../components/Login";
import { userLogin } from "../../api/auth";

const UserLogin = () => {
  return (
    <>
      <LoginPage role="employee" handleLogin={userLogin}/>
    </>
  );
};

export default UserLogin;
