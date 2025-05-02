// Topbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const today = new Date();
  const formatted = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  return (
    <header className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
      <div className="date">
        <span>{formatted}</span> 🔔
      </div>
      <button onClick={handleLogout} style={{ padding: "6px 12px", borderRadius: "6px", backgroundColor: "#0284c7", color: "white", border: "none", cursor: "pointer" }}>
        로그아웃
      </button>
    </header>
  );
};

export default Topbar;
