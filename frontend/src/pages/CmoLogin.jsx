
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ShieldCheck } from "lucide-react";

export default function CmoLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/cmo-login",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem(
        "cmo_access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "cmo_admin",
        JSON.stringify(response.data.admin)
      );

      navigate("/cmo-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-4 rounded-full">
            <ShieldCheck size={35} className="text-blue-700" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900">
          CMO Administration
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-7">
          Sign in to manage public grievances.
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Admin Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link to="/" className="text-blue-700 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
