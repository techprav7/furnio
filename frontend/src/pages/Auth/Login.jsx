import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import bgImg from "../../assets/Bglogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      useAuthStore.getState().setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch {
      // error is set in store
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-end"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-full max-w-md h-[570px] bg-white/30 backdrop-blur-md p-5 rounded-3xl shadow-lg mx-4 lg:relative lg:left-[-80px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-xl font-medium">
              Welcome to <span className="text-[#B88E2F] font-semibold">Furnio</span>
            </h2>
            <h1 className="text-4xl font-bold mt-1">Sign in</h1>
          </div>
          <div className="text-sm text-right">
            <p className="text-gray-500">No Account?</p>
            <Link
              to="/register"
              className="text-[#B88E2F] font-medium no-underline hover:underline visited:text-[#B88E2F]"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Social Login */}
        <div className="mb-3">
          <button className="flex items-center justify-center gap-3 w-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-2 px-4 rounded-lg transition-colors">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <div className="flex justify-center gap-4 mt-4 text-xl">
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <FaFacebookF />
            </button>
            <button className="text-gray-800 hover:text-black transition-colors">
              <FaApple />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="login-email" className="block text-sm font-medium mb-1">
              Enter your email address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="login-password" className="block text-sm font-medium mb-1">
              Enter your Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs hover:text-gray-700"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B88E2F] hover:bg-[#8E6F24] disabled:bg-[#d4b96a] text-white font-semibold py-2 px-4 shadow-md transition-all rounded-lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
