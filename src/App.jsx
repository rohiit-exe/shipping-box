import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BoxForm from "./components/boxForm";
import BoxTable from "./components/boxTable";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/form" replace />} />
          <Route path="/form" element={<BoxForm />} />
          <Route path="/list" element={<BoxTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
