
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  RefreshCw
} from "lucide-react";

const API = "http://127.0.0.1:8000";

const departments = [
  "Public Works Department",
  "Health Department",
  "Education Department",
  "Water Resources Department",
  "Electricity Department",
  "Local Self Government Department",
  "Transport Department",
  "Police Department",
  "Other"
];

const statuses = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
  "Reopened"
];

export default function CmoDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("cmo_access_token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const loadDashboard = async () => {
    if (!token) {
      navigate("/cmo-login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [statsResponse, grievancesResponse] =
        await Promise.all([
          axios.get(`${API}/cmo/overview`, { headers }),
          axios.get(`${API}/cmo/grievances`, { headers })
        ]);

      setStats(statsResponse.data);
      setGrievances(grievancesResponse.data);
    } catch (err) {
      if (err.response?.status === 401 ||
          err.response?.status === 403) {
        localStorage.removeItem("cmo_access_token");
        localStorage.removeItem("cmo_admin");
        navigate("/cmo-login");
        return;
      }

      setError(
        err.response?.data?.detail ||
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateGrievance = async (id, changes) => {
    try {
      await axios.put(
        `${API}/cmo/grievances/${id}`,
        changes,
        { headers }
      );

      await loadDashboard();
      alert("Grievance updated successfully.");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Unable to update grievance."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("cmo_access_token");
    localStorage.removeItem("cmo_admin");
    navigate("/cmo-login");
  };

  const cards = [
    {
      label: "Total Grievances",
      value: stats.total ?? 0,
      icon: FileText
    },
    {
      label: "Submitted",
      value: stats.submitted ?? 0,
      icon: AlertCircle
    },
    {
      label: "In Progress",
      value: stats.in_progress ?? 0,
      icon: Clock
    },
    {
      label: "Resolved",
      value: stats.resolved ?? 0,
      icon: CheckCircle
    }
  ];

  const filteredGrievances = grievances.filter((item) =>
    filter === "All" ? true : item.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading CMO dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={28} />
            <div>
              <h1 className="text-xl font-bold">
                CM Kerala Administration
              </h1>
              <p className="text-sm text-slate-300">
                CMO Grievance Management Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Dashboard Overview
            </h2>
            <p className="text-slate-500 mt-1">
              Review and manage citizen grievances.
            </p>
          </div>

          <button
            onClick={loadDashboard}
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg"
          >
            <RefreshCw size={17} /> Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <p className="text-slate-500 text-sm">
                    {card.label}
                  </p>
                  <Icon className="text-blue-700" size={22} />
                </div>
                <p className="text-3xl font-bold mt-4">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">
                Grievance Management
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                View, assign and update submitted grievances.
              </p>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="All">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {filteredGrievances.length === 0 ? (
            <p className="text-slate-500 py-8 text-center">
              No grievances found.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredGrievances.map((item) => (
                <GrievanceCard
                  key={item.id}
                  item={item}
                  onUpdate={updateGrievance}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function GrievanceCard({ item, onUpdate }) {
  const [department, setDepartment] = useState(
    item.assigned_department || ""
  );

  const [status, setStatus] = useState(item.status);
  const [remarks, setRemarks] = useState(
    item.admin_remarks || ""
  );

  const saveChanges = () => {
    onUpdate(item.id, {
      assigned_department: department || null,
      status,
      admin_remarks: remarks || null
    });
  };

  return (
    <div className="border rounded-xl p-5">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <p className="text-sm text-blue-700 font-semibold">
            {item.reference_id}
          </p>
          <h3 className="text-lg font-bold mt-1">
            {item.subject}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {item.district} · {item.category}
          </p>
        </div>

        <span className="h-fit bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
          {item.status}
        </span>
      </div>

      <p className="text-slate-700 mt-4 whitespace-pre-wrap">
        {item.description}
      </p>

      <p className="text-xs text-slate-500 mt-3">
        Submitted: {new Date(item.created_at).toLocaleString()}
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="block text-sm font-medium mb-2">
            Assign Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select department</option>
            {departments.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            {statuses.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Administrative Remarks
        </label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={3}
          placeholder="Enter review notes or instructions..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        onClick={saveChanges}
        className="mt-4 bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
      >
        Save Changes
      </button>
    </div>
  );
}
