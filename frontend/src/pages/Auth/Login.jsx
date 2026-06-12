import { SignIn } from "@clerk/clerk-react";
import bgImg from "../../assets/Bglogin.png";

const Login = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <SignIn signUpUrl="/register" fallbackRedirectUrl="/" />
    </div>
  );
};

export default Login;
