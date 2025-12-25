import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call your backend login API
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

     // after successful login
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);

// everyone goes to admin layout
navigate("/admin");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Login Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">Please login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-transparent text-gray-800
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <label
                className="absolute left-4 top-3 text-gray-400 text-sm bg-white px-1
                           peer-placeholder-shown:top-3.5
                           peer-placeholder-shown:text-base
                           peer-focus:top-[-8px]
                           peer-focus:text-sm
                           peer-focus:text-blue-600 transition-all"
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-transparent text-gray-800
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <label
                className="absolute left-4 top-3 text-gray-400 text-sm bg-white px-1
                           peer-placeholder-shown:top-3.5
                           peer-placeholder-shown:text-base
                           peer-focus:top-[-8px]
                           peer-focus:text-sm
                           peer-focus:text-blue-600 transition-all"
              >
                Password
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                         text-white font-semibold shadow-md hover:shadow-lg
                         hover:from-blue-700 hover:to-blue-600
                         active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">© 2025 ICS</p>
        </div>

        {/* Right: Image Section */}
        <div className="hidden md:block">
          <img src={image} alt="Company" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
