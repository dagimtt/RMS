import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, Shield } from "lucide-react";

function AddUser() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    navigate("/admin/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Add New User</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="input pl-10"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="input pl-10"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input pl-10"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          {/* Role */}
          <div className="relative">
            <select
              name="role"
              onChange={handleChange}
              className="input pl-10"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={form.password !== form.confirmPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create User
          </button>
        </form>
      </div>

      {/* Tailwind helpers */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.75rem;
            border: 1px solid #d1d5db;
            outline: none;
            transition: all 0.2s;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
          .icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
          }
        `}
      </style>
    </div>
  );
}

export default AddUser;
