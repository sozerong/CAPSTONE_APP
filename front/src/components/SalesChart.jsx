// SalesChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const SalesChart = ({ title, data, type = "line" }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value
  }));

  const ChartComponent = type === "bar" ? BarChart : LineChart;

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={210}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {type === "bar" ? (
            <Bar dataKey="value" fill="#1976d2" barSize={50} /> // ✅ barSize로 두께 조절 (기본은 너무 두꺼움)
          ) : (
            <Line type="monotone" dataKey="value" stroke="#1976d2" dot />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
