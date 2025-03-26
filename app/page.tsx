"use client";
import Dashboard from "./components/Interface/pages/Datasource";
import LandingPage from "./components/Interface/pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
