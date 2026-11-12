
import { useState } from "react";
import { Link } from "react-router-dom";
import { Landmark, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Keep the rest of your existing code below

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!/^[0-9]{10}$/.test(formData.mobile)) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    const response = await axios.post(
      "https://cm-kerala-api-6x3u.onrender.com/auth/register",
      {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      }
    );

    setSuccess(
      `Account created successfully! Welcome, ${response.data.name}.`
    );

    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });

  } catch (err) {
    setError(
      err.response?.data?.detail ||
      "Registration failed. Please try again."
    );
  }
};

  return (
    <div className="min-h-screen bg-[#F1F7F3] flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8 md:p-10">

        <div className="text-center mb-8">
          <div className="bg-[#176B50] text-white p-4 rounded-xl inline-block mb-4">
            <Landmark size={30} />
          </div>

          <h1 className="text-2xl font-bold text-[#173D32]">
            Create Your Account
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Register to access citizen grievance services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <User size={18} className="text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

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
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Mobile Number
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <Phone size={18} className="text-slate-400" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
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
                placeholder="Create a password"
                minLength={8}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                minLength={8}
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
            Create Account
            <ArrowRight size={18} />
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-[#176B50] font-semibold">
            Login
          </Link>
        </p>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-slate-400 hover:text-[#176B50]">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
