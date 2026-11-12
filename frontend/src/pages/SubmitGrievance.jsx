
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function SubmitGrievance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district: "",
    category: "",
    subject: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/grievances/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReferenceId(response.data.reference_id);
      setFormData({
        district: "",
        category: "",
        subject: "",
        description: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to submit your grievance. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (referenceId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={55} />
          <h1 className="text-2xl font-bold text-slate-900">
            Grievance Submitted!
          </h1>
          <p className="text-slate-600 mt-3">
            Your grievance has been successfully registered.
          </p>
          <div className="bg-blue-50 rounded-xl p-5 mt-6">
            <p className="text-sm text-slate-600">Your reference ID</p>
            <p className="text-2xl font-bold text-blue-700 mt-2">
              {referenceId}
            </p>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Save this ID to track your grievance.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-7 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-blue-700 mb-6"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Submit a Grievance
          </h1>
          <p className="text-slate-600 mt-2 mb-8">
            Provide the details below to register your complaint.
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select your district</option>
                {[
                  "Thiruvananthapuram", "Kollam", "Pathanamthitta",
                  "Alappuzha", "Kottayam", "Idukki", "Ernakulam",
                  "Thrissur", "Palakkad", "Malappuram", "Kozhikode",
                  "Wayanad", "Kannur", "Kasaragod"
                ].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select a category</option>
                {[
                  "Roads and Transportation",
                  "Water Supply",
                  "Electricity",
                  "Healthcare",
                  "Education",
                  "Sanitation",
                  "Public Safety",
                  "Other"
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={200}
                placeholder="Briefly describe your issue"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Grievance Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={5000}
                rows={6}
                placeholder="Explain your issue in detail..."
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Submitting..." : "Submit Grievance"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
