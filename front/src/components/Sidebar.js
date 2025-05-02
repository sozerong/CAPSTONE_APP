// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // 현재 URL 경로 알아내기

  // 메뉴 아이템과 라우터 경로 정의
  const menuItems = [
    { name: "Dash Board", path: "/" },
    { name: "메뉴 추천", path: "/menu" },
    { name: "우리동네 매출분석", path: "/sales" },
    { name: "우리동네 카페현황", path: "/cafe" },
    { name: "가계부", path: "/budget" },
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">V. C. C.</h1>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}; 

export default Sidebar;
