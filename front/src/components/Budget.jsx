import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
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
import "./css/Budget.css";

registerLocale("ko", ko);

const API_URL = process.env.REACT_APP_API_URL; 

const getDateKey = (date) => {
  const kstDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return kstDate.toISOString().split("T")[0];
};

const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek + 1);

  return [...Array(7)].map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  });
};

const Budget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [salesInput, setSalesInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [records, setRecords] = useState({});

  const fetchBudget = async (date) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const isoDate = getDateKey(date);

    try {
      const res = await axios.get(`${API_URL}/api/data/budget/${isoDate}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setRecords((prev) => ({
        ...prev,
        [isoDate]: res.data,
      }));
    } catch (err) {
      setRecords((prev) => ({
        ...prev,
        [isoDate]: { sales: 0, expense: 0 },
      }));
    }
  };

  const handleInput = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const isoDate = getDateKey(selectedDate);
    const payload = {
      date: isoDate,
      sales: parseInt(salesInput) || 0,
      expense: parseInt(expenseInput) || 0,
    };

    try {
      await axios.post(`${API_URL}/api/data/budget/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setRecords((prev) => ({
        ...prev,
        [isoDate]: payload,
      }));

      setSalesInput("");
      setExpenseInput("");
    } catch (err) {
      console.error("저장 실패:", err);
    }
  };

  useEffect(() => {
    fetchBudget(selectedDate);
  }, []);

  useEffect(() => {
    const key = getDateKey(selectedDate);
    if (!records[key]) {
      fetchBudget(selectedDate);
    }
  }, [selectedDate]);

  const currentData = records[getDateKey(selectedDate)] || {
    sales: 0,
    expense: 0,
  };

  const totalSales = getCurrentWeekDates().reduce((sum, d) => {
    const v = records[getDateKey(d)];
    return sum + (v?.sales || 0);
  }, 0);

  const totalExpense = getCurrentWeekDates().reduce((sum, d) => {
    const v = records[getDateKey(d)];
    return sum + (v?.expense || 0);
  }, 0);

  const profit = totalSales - totalExpense;

  const chartData = getCurrentWeekDates().map((date) => {
    const key = getDateKey(date);
    const data = records[key] || { sales: 0, expense: 0 };
    return {
      date: key,
      sales: data.sales,
      expense: data.expense,
    };
  });

  const message =
    currentData.sales > 200000
      ? "🔥 오늘은 매출이 좋은 날이에요!"
      : currentData.expense > 100000
      ? "💸 지출이 많은 날이에요. 관리가 필요해요!"
      : "😊 평범한 하루입니다.";

  return (
    <div className="budget-layout">
      <div className="calendar-box">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          inline
          locale="ko"
        />
      </div>

      <div className="budget-box">
        <h3>{getDateKey(selectedDate)}</h3>
        <div className="input-row">
          <label>💰 매출</label>
          <input
            type="number"
            value={salesInput}
            onChange={(e) => setSalesInput(e.target.value)}
          />
        </div>
        <div className="input-row">
          <label>💸 지출</label>
          <input
            type="number"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
          />
        </div>
        <button className="save-btn" onClick={handleInput}>
          입력
        </button>

        <div className="summary">
          <p>총 매출: ₩ {currentData.sales.toLocaleString()}</p>
          <p>총 지출: ₩ {currentData.expense.toLocaleString()}</p>
          <p style={{ fontStyle: "italic", color: "#555" }}>{message}</p>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <div className="summary">
          <h4>📅 이번 주 요약</h4>
          <p>총 매출: ₩ {totalSales.toLocaleString()}</p>
          <p>총 지출: ₩ {totalExpense.toLocaleString()}</p>
          <p
            style={{
              fontWeight: "bold",
              color: profit >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {profit >= 0 ? "순이익" : "순손실"}: ₩ {Math.abs(profit).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="chart-box">
        <h4>📈 이번 주 매출/지출 추이</h4>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
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
    </div>
  );
};

export default Budget;
