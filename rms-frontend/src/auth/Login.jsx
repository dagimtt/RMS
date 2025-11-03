import { useState } from "react";
import { Lock, User } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
              Remember me
            </label>
            <a href="#" className="hover:text-indigo-500 transition">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-500 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
