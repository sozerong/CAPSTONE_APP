import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // ✅ 스토리지 변화 감지 (다른 탭에서도 반영되도록)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ 로그인 후 바로 반영되도록 폴링 대안 (로그인 직후 리렌더링되도록)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
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
