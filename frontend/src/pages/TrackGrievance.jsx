
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Search, FileText } from "lucide-react";

export default function TrackGrievance() {
  const [referenceId, setReferenceId] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setGrievance(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `http://127.0.0.1:8000/grievances/track/${encodeURIComponent(referenceId.trim())}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGrievance(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Unable to find this grievance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-blue-700 mb-6">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Track Your Grievance
          </h1>
          <p className="text-slate-600 mt-2 mb-7">
            Enter your reference ID to check the status of your complaint.
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder="Example: CMK-XXXXXXXXXX"
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Search size={18} />
              {loading ? "Searching..." : "Track Grievance"}
            </button>
          </form>

          {error && (
            <p className="mt-5 bg-red-50 text-red-700 p-3 rounded-lg">
              {error}
            </p>
          )}

          {grievance && (
            <div className="mt-7 border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-blue-700" size={25} />
                <h2 className="text-xl font-semibold">Grievance Details</h2>
              </div>

              <p className="text-sm text-slate-500">Reference ID</p>
              <p className="font-bold text-blue-700 mb-4">
                {grievance.reference_id}
              </p>

              <p className="font-semibold">{grievance.subject}</p>
              <p className="text-slate-600 mt-2">{grievance.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-slate-500">District</p>
                  <p>{grievance.district}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Category</p>
                  <p>{grievance.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className="inline-block mt-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {grievance.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Submitted</p>
                  <p>
                    {new Date(grievance.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
