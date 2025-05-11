import SignUp from "../../components/SignUp";
import { managerSignup } from "../../api/auth";

const ManagerSignup = () => {
  return (
    <>
      <SignUp role='manager' handleSignup={managerSignup}/>
    </>
  );
};

export default ManagerSignup;
