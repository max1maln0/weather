import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/Weather/HomePage.jsx"
import Weather from "../pages/Weather/Weather.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<Weather />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
