import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import JobMatch from "./pages/JobMatch";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/jobs" element={<JobMatch />} />
          <Route path="/analytics" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
