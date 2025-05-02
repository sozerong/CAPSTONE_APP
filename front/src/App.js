import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import Home from "./components/Home";
import MenuRecommend from "./components/MenuRecommend";
import SalesAnalysis from "./components/SalesAnalysis";
import CafeStatus from "./components/CafeStatus";
import Budget from "./components/Budget";
import Login from "./components/Login";



function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Topbar />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/menu" element={<MenuRecommend />} />
                      <Route path="/sales" element={<SalesAnalysis />} />
                      <Route path="/cafe" element={<CafeStatus />} />
                      <Route path="/budget" element={<Budget />} />
                    </Routes>
                  </div>
                  <Bottombar />
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;