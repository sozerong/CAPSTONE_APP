import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLocation } from "react-router-dom";
import './css/Home.css';

const Home = () => {
  const location = useLocation();
  const [recommendMenu, setRecommendMenu] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // ✅ KST 기준 날짜 변환 함수
  const getKSTDateString = (date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const kstDate = new Date(date.getTime() - tzOffset);
    return kstDate.toISOString().split("T")[0];
  };

  const fetchRecommend = async () => {
    try {
      const keyword = "카페 신메뉴 추천";
      const encoded = encodeURIComponent(keyword);
      const res = await axios.get(`http://localhost:8001/search?query=${encoded}`);
      setRecommendMenu(res.data[0]);
    } catch (err) {
      console.error("추천 메뉴 불러오기 실패:", err);
    }
  };

  const getCurrentMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dates = [];

    for (let d = 1; d <= today.getDate(); d++) {
      dates.push(new Date(year, month, d));
    }

    return dates;
  };

  const fetchMonthlySummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const dates = getCurrentMonthDates();
    let salesSum = 0;
    let expenseSum = 0;

    await Promise.all(
      dates.map(async (date) => {
        const iso = getKSTDateString(date); // ✅ KST 기준
        try {
          const res = await axios.get(`http://localhost:8000/api/data/budget/${iso}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          salesSum += res.data.sales;
          expenseSum += res.data.expense;
        } catch {
          // 무시
        }
      })
    );

    setTotalSales(salesSum);
    setTotalExpense(expenseSum);
  };

  const fetchBudgetForMonth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const dates = getCurrentMonthDates();
    const result = [];

    await Promise.all(
      dates.map(async (date) => {
        const iso = getKSTDateString(date); // ✅ KST 기준
        const label = date.toLocaleDateString("ko-KR", {
          month: "2-digit",
          day: "2-digit"
        });

        try {
          const res = await axios.get(`http://localhost:8000/api/data/budget/${iso}/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          result.push({
            date: label,
            sales: res.data.sales,
            expense: res.data.expense
          });
        } catch (err) {
          result.push({
            date: label,
            sales: 0,
            expense: 0
          });
        }
      })
    );

    result.sort((a, b) => new Date(`2024-${a.date}`) - new Date(`2024-${b.date}`));
    setMonthlyData(result);
  };

  useEffect(() => {
    fetchRecommend();
    fetchMonthlySummary();
    fetchBudgetForMonth();
  }, [location.pathname]);

  return (
    <>
          <section className="charts"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          marginBottom: '50px',
          justifyContent: 'space-between'
        }}
      >
        <div className="card" style={{
          flex: "1 1 45%",
          minWidth: "300px",
          maxHeight: '300px',
          overflow: "hidden"
        }}>
        <div className="card-title">이번달 추천메뉴</div>
        {recommendMenu ? (
          <div style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "5px",
            paddingBottom: "5px"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "#f7f7f7",
              padding: "20px",
              borderRadius: "10px"
            }}>
              {recommendMenu.recommendations.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "14px 18px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                }}>
                  <h4 style={{ marginBottom: "6px", color: "#333" }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <img src="/spinner.gif" alt="로딩 중" style={{ width: "50px", height: "50px" }} />
            </div>
          )}
        </div>

        <div className="card" style={{
          flex: "1 1 45%",
          minWidth: "300px",
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <div className="card-title">지역 평균 매출</div>
          <img src="/bar_sample.png" alt="매출 비교" style={{ width: '100%' }} />
        </div>
      </section>
      <section className="cards"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          marginBottom: '50px',
          justifyContent: 'space-between'
        }}
      >
        <div className="card" style={{
          flex: "1 1 40%",
          minWidth: "300px",
          height: "320px"
        }}>
          <div className="card-title">📊 이번달 매출 / 지출</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4ade80"
                name="매출"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#f87171"
                name="지출"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </section>


    </>
  );
};

export default Home;
