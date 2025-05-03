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
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useLocation } from "react-router-dom";
import './css/Home.css';

const Home = () => {
  const location = useLocation();
  const [recommendMenu, setRecommendMenu] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [avgSalesData, setAvgSalesData] = useState([]);

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
        const iso = getKSTDateString(date);
        try {
          const res = await axios.get(`http://localhost:8000/api/data/budget/${iso}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          salesSum += res.data.sales;
          expenseSum += res.data.expense;
        } catch {}
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
        const iso = getKSTDateString(date);
        const label = date.toLocaleDateString("ko-KR", {
          month: "2-digit",
          day: "2-digit"
        });

        try {
          const res = await axios.get(`http://localhost:8000/api/data/budget/${iso}/`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          result.push({ date: label, sales: res.data.sales, expense: res.data.expense });
        } catch {
          result.push({ date: label, sales: 0, expense: 0 });
        }
      })
    );

    result.sort((a, b) => new Date(`2024-${a.date}`) - new Date(`2024-${b.date}`));
    setMonthlyData(result);
  };

  const fetchAvgSales = async () => {
    try {
      const gu = "광진구"; // 또는 사용자 정보 기반으로 설정
      const res = await axios.get(`https://cafe-sales.onrender.com/sales/monthly_avg/${encodeURIComponent(gu)}`);
      const avg = res.data["카페당_월_평균_매출"];
  
      const chartData = [
        {
          name: "당월 평균 매출",  // ✅ 라벨 고정
          value: Math.round(avg/10000), // 💰 만원 단위 변환
        },
      ];
  
      setAvgSalesData(chartData);
    } catch (err) {
      console.error("지역 평균 매출 요청 실패:", err);
    }
  };
  

  useEffect(() => {
    fetchRecommend();
    fetchMonthlySummary();
    fetchBudgetForMonth();
    fetchAvgSales();
  }, [location.pathname]);
  
  useEffect(() => {
    console.log("📊 평균 매출 데이터 확인:", avgSalesData);
  }, [avgSalesData]);
  

  return (
    <>
      <section className="charts" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        marginBottom: '50px',
        justifyContent: 'space-between'
      }}>
        <div className="card" style={{ flex: "1 1 45%", minWidth: "300px", maxHeight: '300px', overflow: "hidden" }}>
          <div className="card-title">이번달 추천메뉴</div>
          {recommendMenu ? (
            <div style={{ flex: 1, overflowY: "auto", paddingRight: "5px", paddingBottom: "5px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#f7f7f7", padding: "20px", borderRadius: "10px" }}>
                {recommendMenu.recommendations.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
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

        {/* ✅ 지역 평균 매출 */}
        <div className="card" style={{ flex: "1 1 45%", minWidth: "300px", maxHeight: '300px', overflowY: 'auto' }}>
          <div className="card-title">자치구 평균 매출</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()}만원`} />
              <Bar
                dataKey="value"
                fill="#007acc"
                barSize={24} // ✅ 막대 너비 줄임
                label={false} // ✅ 숫자 라벨 제거
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </section>

      {/* ✅ 매출/지출 라인차트 */}
      <section className="cards" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        marginBottom: '50px',
        justifyContent: 'space-between'
      }}>
        <div className="card" style={{ flex: "1 1 40%", minWidth: "300px", height: "320px" }}>
          <div className="card-title">📊 이번달 매출 / 지출</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4ade80" name="매출" strokeWidth={2} dot />
              <Line type="monotone" dataKey="expense" stroke="#f87171" name="지출" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default Home;
