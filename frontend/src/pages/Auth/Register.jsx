import { SignUp } from "@clerk/clerk-react";
import bgImg from "../../assets/Bglogin.png";

const Register = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <SignUp signInUrl="/login" fallbackRedirectUrl="/" />
    </div>
  );
};

export default Register;
