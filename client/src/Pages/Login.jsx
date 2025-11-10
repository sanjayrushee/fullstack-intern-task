import { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../Route&apis/Apiconfig";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(`${API_CONFIG.UserLink}/login`, {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("userId", decoded.id);

      window.location.href = "/templates";
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-white to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to continue
        </p>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200 shadow"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?
          <a
            href="/register"
            className="text-black font-medium hover:underline ml-1"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
