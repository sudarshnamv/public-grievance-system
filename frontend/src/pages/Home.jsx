import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Search,
  FileText,
  Building2,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
  Construction,
  Users,
  Menu,
  ChevronRight,
  Landmark,
  CheckCircle2,
  Clock3,
  MessageSquareText,
} from "lucide-react";

const departments = [
  {
    name: "Public Works",
    description: "Roads, bridges and public infrastructure",
    icon: Construction,
  },
  {
    name: "Health & Family Welfare",
    description: "Hospitals and public healthcare services",
    icon: HeartPulse,
  },
  {
    name: "General Education",
    description: "Schools, colleges and educational facilities",
    icon: GraduationCap,
  },
  {
    name: "Local Self Government",
    description: "Municipalities and local civic services",
    icon: Building2,
  },
];

const steps = [
  "Submit your grievance",
  "CMO reviews your complaint",
  "Department takes action",
  "Track resolution online",
];

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* Top government notice */}
      <div className="bg-[#123D32] text-white text-center text-xs py-2 px-4">
        Government Service Prototype | CM Kerala Public Grievance Portal
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="bg-[#176B50] p-3 rounded-xl text-white">
              <Landmark size={25} />
            </div>

            <div>
              <h1 className="font-bold text-xl text-[#174B3D]">
                CM Kerala
              </h1>
              <p className="text-xs text-slate-500">
                Public Grievance Redressal Portal
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#" className="text-[#176B50]">Home</a>
            <a href="#about" className="hover:text-[#176B50]">About Us</a>
            <a href="#how-it-works" className="hover:text-[#176B50]">How It Works</a>
            <a href="#departments" className="hover:text-[#176B50]">Departments</a>
            <a href="#contact" className="hover:text-[#176B50]">Contact</a>
          </nav>

          <div className="hidden md:flex gap-3">
  <Link
    to="/login"
    className="border border-[#176B50] text-[#176B50] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-50"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="bg-[#176B50] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#12523D]"
  >
    Register
  </Link>
</div>
          <button className="md:hidden">
            <Menu size={25} />
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-[#F1F7F3]">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">

          <div>
            <span className="inline-flex items-center gap-2 bg-green-100 text-[#176B50] px-4 py-2 rounded-full text-xs font-bold mb-6">
              <ShieldCheck size={15} />
              OFFICIAL PORTAL CONCEPT
            </span>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#173D32] mb-6">
              Your Voice.
              <br />
              Your Rights.
              <br />
              <span className="text-[#21845F]">
                Our Responsibility.
              </span>
            </h2>

            <p className="text-slate-600 text-base leading-8 max-w-lg mb-8">
              A digital platform designed to help citizens of Kerala
              raise public grievances, connect with government
              departments and track the progress of their complaints.
            </p>

            <div className="flex flex-wrap gap-4">
  <Link
    to="/submit-grievance"
    className="bg-[#176B50] text-white px-6 py-4 rounded-lg font-semibold flex items-center gap-3 hover:bg-[#12523D]"
  >
    Submit a Grievance
    <ArrowRight size={18} />
  </Link>

  <Link
    to="/track-grievance"
    className="border border-[#176B50] text-[#176B50] px-6 py-4 rounded-lg font-semibold flex items-center gap-3 hover:bg-green-50"
  >
    <Search size={18} />
    Track Grievance
  </Link>
</div>

            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <ShieldCheck size={19} className="text-[#21845F]" />
              Transparent. Accountable. Citizen-focused.
            </div>
          </div>

          {/* Hero information card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-slate-500">
                    Citizen Services
                  </p>
                  <h3 className="text-2xl font-bold text-[#173D32] mt-1">
                    How can we help?
                  </h3>
                </div>

                <div className="bg-green-100 p-3 rounded-xl text-[#176B50]">
                  <MessageSquareText size={27} />
                </div>
              </div>

              {[
                {
                  icon: FileText,
                  title: "Register a Complaint",
                  desc: "Submit your grievance online",
                },
                {
                  icon: Search,
                  title: "Track Your Complaint",
                  desc: "Check the latest status",
                },
                {
                  icon: Clock3,
                  title: "View Updates",
                  desc: "Stay informed about actions taken",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl mb-4 hover:border-green-300"
                >
                  <div className="bg-[#EAF5EE] text-[#176B50] p-3 rounded-lg">
                    <item.icon size={23} />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <ChevronRight className="text-slate-400" size={20} />
                </div>
              ))}

              <p className="text-xs text-center text-slate-400 mt-5">
                Accessible citizen grievance services
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            { value: "1,250+", label: "Grievances Received", icon: FileText },
            { value: "850+", label: "Resolved Cases", icon: CheckCircle2 },
            { value: "14", label: "Districts Covered", icon: Building2 },
            { value: "24/7", label: "Online Access", icon: Users },
          ].map((item, index) => (
            <div key={index} className="p-6 border border-slate-200 rounded-xl">
              <item.icon className="text-[#21845F] mb-4" size={25} />
              <h3 className="text-3xl font-bold text-[#173D32]">
                {item.value}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </div>
        <p className="text-xs text-slate-400 mt-3">
          Illustrative demonstration figures. Not official government statistics.
        </p>
      </section>

      {/* About */}
      <section id="about" className="bg-[#F8FAF9] py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-[#21845F] font-bold text-sm uppercase tracking-widest mb-3">
              About the initiative
            </p>

            <h2 className="text-3xl font-bold text-[#173D32] mb-5">
              A platform where every citizen is heard.
            </h2>

            <p className="text-slate-600 leading-8">
              CM Kerala is a proposed digital grievance management
              platform that aims to simplify communication between
              citizens and government departments through transparent
              complaint registration, tracking and resolution.
            </p>

            <button className="mt-7 text-[#176B50] font-semibold flex items-center gap-2">
              Learn more <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              "Citizen First",
              "Transparency",
              "Accountability",
              "Accessible Services",
            ].map((item, index) => (
              <div key={index} className="bg-white p-7 rounded-xl border border-slate-200">
                <CheckCircle2 className="text-[#21845F] mb-4" size={27} />
                <h3 className="font-semibold text-[#173D32]">{item}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-[#21845F] font-bold text-sm uppercase tracking-widest mb-3">
              Simple process
            </p>
            <h2 className="text-3xl font-bold text-[#173D32]">
              How It Works
            </h2>
            <p className="text-slate-500 mt-3">
              Four simple steps to raise and track your grievance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-7">
                <div className="bg-[#176B50] text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold mb-6">
                  0{index + 1}
                </div>
                <h3 className="font-semibold text-lg text-[#173D32]">
                  {step}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="bg-[#F1F7F3] py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#21845F] font-bold text-sm uppercase tracking-widest mb-3">
                Government services
              </p>
              <h2 className="text-3xl font-bold text-[#173D32]">
                Featured Departments
              </h2>
            </div>

            <button className="hidden md:flex items-center gap-2 text-[#176B50] font-semibold">
              View all <ArrowRight size={17} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#EAF5EE] text-[#176B50] p-3 rounded-xl w-fit mb-5">
                  <dept.icon size={27} />
                </div>

                <h3 className="font-bold text-[#173D32] mb-2">
                  {dept.name}
                </h3>

                <p className="text-sm text-slate-500 leading-6">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-6 bg-[#173D32] rounded-2xl p-10 md:p-14 text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Your concerns matter.
            </h2>
            <p className="text-green-100">
              Take the first step towards getting your grievance addressed.
            </p>
          </div>

          <button className="bg-white text-[#176B50] px-7 py-4 rounded-lg font-bold flex items-center gap-3">
            Submit Grievance <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#102F27] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>
              <h2 className="font-bold text-xl mb-3">CM Kerala</h2>
              <p className="text-sm text-green-100 max-w-sm leading-7">
                A citizen-focused public grievance redressal
                portal prototype for transparent public service delivery.
              </p>
            </div>

            <div className="text-sm text-green-100 leading-8">
              <p>Home</p>
              <p>About Us</p>
              <p>Departments</p>
              <p>Contact Us</p>
            </div>

          </div>

          <div className="border-t border-green-800 mt-9 pt-6 text-xs text-green-200 text-center">
            © 2026 CM Kerala Prototype. Developed for recruitment evaluation.
            Not an official Government of Kerala website or service.
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
