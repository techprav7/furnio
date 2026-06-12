import { useState } from "react";
import bgImg from "../../assets/Bglogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error, clearError, setError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(name, email, password);
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
      <div className="w-full max-w-md h-[600px] bg-white/30 backdrop-blur-md p-5 rounded-3xl shadow-lg mx-4 lg:relative lg:left-[-80px] flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-medium">
                Welcome to{" "}
                <span className="text-[#B88E2F] font-semibold">Furnio</span>
              </h2>
              <h1 className="text-3xl font-bold mt-1">Sign up</h1>
            </div>
            <div className="text-sm text-right">
              <p className="text-gray-500">Already have an account?</p>
              <Link
                to="/login"
                className="text-[#B88E2F] font-medium hover:underline no-underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} id="register-form">
            <div className="space-y-2">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Praver Jain"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
                    required
                    autoComplete="new-password"
                    minLength={6}
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

              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="reg-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#B88E2F] transition-shadow"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            form="register-form"
            disabled={loading}
            className="w-full bg-[#B88E2F] hover:bg-[#8E6F24] disabled:bg-[#d4b96a] text-white font-semibold py-2 rounded-xl shadow-md transition-all"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
