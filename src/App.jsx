import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./component/Sidebar/Sidebar";
import Dashboard from "./page/Dashboard/Dashboard";
import FraudTable from "./page/Predict/Predict";

export default function App() {
  return (
    <div>
      <Sidebar />
      <div className="sm:ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predict" element={<FraudTable />} />
        </Routes>
      </div>
    </div>
  );
}
