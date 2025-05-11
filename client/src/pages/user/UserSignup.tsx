import SignUp from "../../components/SignUp";
import { userSignup } from "../../api/auth";

const UserSignup = () => {
  return (
    <>
      <SignUp role='employee' handleSignup={userSignup}/>
    </>
  );
};

export default UserSignup;
