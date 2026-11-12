
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InfoPage from "./pages/InfoPage";
import SubmitGrievance from "./pages/SubmitGrievance";
import TrackGrievance from "./pages/TrackGrievance";
import CmoLogin from "./pages/CmoLogin";
import CmoDashboard from "./pages/CmoDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
            <InfoPage
              title="About Us"
              description="Learn about the CM Kerala public grievance initiative."
            />
          }
        />

        <Route
          path="/how-it-works"
          element={
            <InfoPage
              title="How It Works"
              description="Understand how grievances are submitted, reviewed and resolved."
            />
          }
        />

        <Route
          path="/departments"
          element={
            <InfoPage
              title="Departments"
              description="Explore the departments handling public grievances."
            />
          }
        />

        <Route
          path="/contact"
          element={
            <InfoPage
              title="Contact Us"
              description="Get in touch with the portal team."
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/submit-grievance"
          element={<SubmitGrievance />}
        />

        <Route
          path="/track-grievance"
          element={<TrackGrievance />}
        />

        <Route path="/cmo-login" element={<CmoLogin />} />

        <Route
          path="/cmo-dashboard"
          element={<CmoDashboard />}
        />

        <Route
          path="*"
          element={
            <InfoPage
              title="404 - Page Not Found"
              description="The requested page does not exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
