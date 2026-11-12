
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Landmark,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const form = new URLSearchParams();

      form.append("username", formData.email);
      form.append("password", formData.password);

      const response = await axios.post(
        "https://cm-kerala-api-6x3u.onrender.com/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "citizen",
        JSON.stringify(response.data.citizen)
      );

      navigate("/dashboard");

      setSuccess(
        `Welcome back, ${response.data.citizen.name}!`
      );

      setFormData({
        email: "",
        password: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F7F3] flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 md:p-10">

        <div className="text-center mb-8">

          <div className="bg-[#176B50] text-white p-4 rounded-xl inline-block mb-4">
            <Landmark size={30} />
          </div>

          <h1 className="text-2xl font-bold text-[#173D32]">
            Welcome Back
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Login to access your citizen account.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Mail size={18} className="text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your registered email"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#176B50] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#12523D]"
          >
            Login
            <ArrowRight size={18} />
          </button>

        </form>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
          <ShieldCheck size={16} className="text-[#21845F]" />
          Secure citizen access
        </div>

        <p className="text-center text-sm text-slate-500 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#176B50] font-semibold"
          >
            Register
          </Link>
        </p>

        <div className="text-center mt-5">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-[#176B50]"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
