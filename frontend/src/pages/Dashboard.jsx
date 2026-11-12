
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Landmark,
  FilePlus2,
  Search,
  ClipboardList,
  LogOut,
  UserCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [citizen, setCitizen] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedCitizen = localStorage.getItem("citizen");

    if (!token || !savedCitizen) {
      navigate("/login");
      return;
    }

    setCitizen(JSON.parse(savedCitizen));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("citizen");
    navigate("/login");
  };

  if (!citizen) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F1F7F3]">

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link to="/" className="flex items-center gap-3">
            <div className="bg-[#176B50] text-white p-2 rounded-lg">
              <Landmark size={24} />
            </div>

            <div>
              <h1 className="font-bold text-[#173D32]">
                CM Kerala
              </h1>
              <p className="text-xs text-slate-500">
                Citizen Portal
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-800"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">
          <p className="text-sm text-slate-500 mb-2">
            Citizen Dashboard
          </p>

          <h2 className="text-3xl font-bold text-[#173D32]">
            Welcome, {citizen.name}!
          </h2>

          <p className="text-slate-600 mt-2">
            Manage your grievances and track their progress here.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-4">
          <UserCircle size={42} className="text-[#176B50]" />

          <div>
            <h3 className="font-semibold text-slate-800">
              {citizen.name}
            </h3>
            <p className="text-sm text-slate-500">
              {citizen.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            to="/submit-grievance"
            className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="bg-green-100 text-green-800 p-3 rounded-xl inline-block mb-5">
              <FilePlus2 size={26} />
            </div>

            <h3 className="text-lg font-bold text-[#173D32]">
              Submit a Grievance
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Report an issue and request assistance.
            </p>

            <div className="flex items-center gap-2 text-[#176B50] font-semibold text-sm mt-5">
              Get Started <ArrowRight size={16} />
            </div>
          </Link>

          <Link
            to="/track-grievance"
            className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="bg-blue-100 text-blue-800 p-3 rounded-xl inline-block mb-5">
              <Search size={26} />
            </div>

            <h3 className="text-lg font-bold text-[#173D32]">
              Track Grievance
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Check the latest status of your grievance.
            </p>

            <div className="flex items-center gap-2 text-[#176B50] font-semibold text-sm mt-5">
              Track Now <ArrowRight size={16} />
            </div>
          </Link>

          <Link
            to="/my-grievances"
            className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="bg-amber-100 text-amber-800 p-3 rounded-xl inline-block mb-5">
              <ClipboardList size={26} />
            </div>

            <h3 className="text-lg font-bold text-[#173D32]">
              My Grievances
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View all grievances submitted by you.
            </p>

            <div className="flex items-center gap-2 text-[#176B50] font-semibold text-sm mt-5">
              View History <ArrowRight size={16} />
            </div>
          </Link>

        </div>

        <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock size={22} className="text-[#176B50]" />
            <h3 className="font-bold text-[#173D32]">
              Grievance Status Updates
            </h3>
          </div>

          <p className="text-sm text-slate-500 mt-3">
            Your submitted grievances and their latest updates will appear here.
          </p>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
