import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ API 주소를 환경변수에서 가져옴
const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dash Board");
  const [currentDate, setCurrentDate] = useState("");
  const [recommendMenu, setRecommendMenu] = useState(null);

  // 오늘 날짜
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

  // ✅ 추천메뉴 API 요청
  useEffect(() => {
    if (activeMenu === "Dash Board") {
      const keyword = "봄 디저트"; // 계절 기반 자동화도 가능
      axios
        .get(`${API_URL}/search?query=${encodeURIComponent(keyword)}`)
        .then((res) => setRecommendMenu(res.data))
        .catch((err) => {
          console.error("추천메뉴 로딩 실패:", err);
          setRecommendMenu(null);
        });
    }
  }, [activeMenu]);

  const renderContent = () => {
    switch (activeMenu) {
      case "메뉴 추천":
        return <p>✨ 이번 달 추천 메뉴입니다!</p>;
      case "우리동네 매출분석":
        return <p>📊 우리 동네 매출 데이터를 분석합니다.</p>;
      case "우리동네 카페현황":
        return <p>🏪 우리 동네 카페 정보를 보여드립니다.</p>;
      case "가계부":
        return <p>📒 가계부 관리 페이지입니다.</p>;
      default:
        return (
          <>
            <section className="cards">
              <div className="card">
                <div className="card-title">수입 / 지출</div>
                <p>₩ 2,550,000 / ₩ 824,000</p>
              </div>
              <div className="card">
                <div className="card-title">이번달 추천메뉴</div>

                {recommendMenu ? (
                  <>
                    <h3>❓ 질문: {recommendMenu.question}</h3>

                    <div style={{
                      backgroundColor: "#f7f7f7",
                      padding: "20px",
                      borderRadius: "10px",
                      whiteSpace: "pre-line",
                      lineHeight: "1.8"
                    }}>
                      {recommendMenu.answer}
                    </div>

                    <h4 style={{ marginTop: "20px" }}>📌 관련 키워드:</h4>
                    <ul style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      listStyle: "none",
                      padding: 0
                    }}>
                      {recommendMenu.keywords.map((kw, idx) => (
                        <li key={idx} style={{
                          backgroundColor: "#e3f2fd",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "14px"
                        }}>
                          #{kw}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>⏳ 추천 메뉴 불러오는 중...</p>
                )}
              </div>
            </section>

            <section className="charts">
              <div className="card">
                <div className="card-title">예상 매출 그래프</div>
                <img src="/graph_sample.png" alt="매출 그래프" />
              </div>
              <div className="card">
                <div className="card-title">매출 비교</div>
                <img src="/bar_sample.png" alt="매출 비교" />
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h1 className="logo">V. C. C.</h1>
        <ul className="menu">
          {["Dash Board", "메뉴 추천", "우리동네 매출분석", "우리동네 카페현황", "가계부"].map((item) => (
            <li
              key={item}
              className={activeMenu === item ? "active" : ""}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        <header className="topbar">
          <div></div>
          <div className="date">
            <span>{currentDate}</span> 🔔
          </div>
        </header>

        {renderContent()}

        <footer className="footer">
          @ CopyRight by YoungRae, TaeRim
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
