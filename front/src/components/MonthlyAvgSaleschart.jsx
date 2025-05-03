import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const FASTAPI_URL = process.env.REACT_APP_FASTAPI_URL; // ✅ 환경변수에서 FastAPI 주소 가져오기

const MonthlyAvgSalesChart = ({ guName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!guName) return;

    axios
      .get(`${FASTAPI_URL}/sales/monthly_avg/${encodeURIComponent(guName)}`) // ✅ 환경변수 기반 주소
      .then((res) => {
        const avg = res.data["당월_평균_매출"];
        setData([
          {
            name: "당월 평균 매출",
            value: Math.round(avg / 10000),
          },
        ]);
      })
      .catch((err) => console.error("평균 매출 요청 실패:", err));
  }, [guName]);

  return (
    <div
      className="card"
      style={{
        flex: "1 1 45%",
        minWidth: "300px",
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <div className="card-title">지역 평균 매출 (만원)</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#007acc" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAvgSalesChart;
