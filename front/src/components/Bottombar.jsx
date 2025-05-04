// Bottombar.js
import React, { useEffect, useState } from "react";

const Bottombar = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="Bottombar">
      <div></div>
      <footer className="footer">
        @ CopyRight by YoungRae, TaeRim
      </footer>
    </div>
  );
};

export default Bottombar;
