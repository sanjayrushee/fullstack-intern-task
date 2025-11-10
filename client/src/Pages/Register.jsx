import React, { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../Route&apis/Apiconfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { name, email, password, confirmPassword } = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    if (!name || !email || !password || !confirmPassword) {
      return setErrorMsg("All fields are required!");
    }

    if (password !== confirmPassword) {
      return setErrorMsg("Passwords do not match!");
    }

    try {
      setLoading(true);

      await axios.post(`${API_CONFIG.UserLink}/register`, formData);

      setSuccessMsg("Account created ✅ Redirecting...");
      setTimeout(() => (window.location.href = "/templates"), 1200);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Register to continue
        </p>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm text-center mb-3">{successMsg}</p>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
            />

            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
            />

            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200 shadow"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?
          <a href="/login" className="text-black font-medium hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
