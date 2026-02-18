import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const API_URL = "https://port-0-fastapi11-ma7qi2cl823545d5.sel4.cloudtype.app";

const InfoBox = ({ title, gu, border = true }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!gu) return;

    const fetchData = async () => {
      try {
        let res;

        if (title === "카페 수") {
          res = await axios.get(`${API_URL}/districts/cafe_count/${gu}`);
          setData({
            labels: ["개인", "프랜차이즈"],
            datasets: [
              {
                data: [res.data.개인카페_수, res.data.프랜차이즈카페_수],
                backgroundColor: ["#FFCC00", "#3399FF"],
              },
            ],
          });
        } else if (title === "인구 : 카페 비율") {
          res = await axios.get(`${API_URL}/districts/cafe_ratio/${gu}`);
          setData(res.data);
        } else if (title === "인기 메뉴") {
          res = await axios.get(`${API_URL}/menu/popular/${gu}`);
          setData(res.data.slice(0, 5));
        } else if (title === "메뉴 평균 가격") {
          res = await axios.get(`${API_URL}/menu/price_stats/${gu}`);
          const labels = res.data.map((item) => item.메뉴);
          const personalPrices = res.data.map((item) => Math.round(item.개인카페_평균가격));
          const franchisePrices = res.data.map((item) => Math.round(item.프랜차이즈_평균가격));

          setData({
            labels,
            datasets: [
                {
                    label: "프랜차이즈",
                    data: franchisePrices,
                    backgroundColor: "#f2a541",
                    },
              {
                label: "개인카페",
                data: personalPrices,
                backgroundColor: "#82ca9d",
              },
            ],
          });
        }
      } catch (err) {
        console.error(err);
        setData("❌ 데이터 불러오기 실패");
      }
    };

    fetchData();
  }, [title, gu]);

  const renderContent = () => {
    if (!gu) return "구를 선택하세요.";
    if (!data) return "로딩 중...";
    if (typeof data === "string") return data;

    if (title === "카페 수") {
      if (!data.datasets || !data.datasets[0]?.data) return "❌ 데이터 없음";
      return (
        <Pie
          data={data}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.parsed || 0;
                    return `${label}: ${value.toLocaleString()}개`;
                  },
                },
              },
              legend: { position: "bottom" },
            },
          }}
        />
      );
    }

    if (title === "인구 : 카페 비율") {
      return (
        <div style={{ marginTop: "5px" }}>
          <div style={{ marginBottom: "8px", fontSize: "25px" }}>
            <strong>{data.자치구}</strong>의 인구는 <strong>{data.소계.toLocaleString()}명</strong>,<br />
            총 카페 수는 <strong>{data.카페수.toLocaleString()}개</strong>입니다.
          </div>
          <div style={{ fontSize: "30px", color: "#2e7d32", fontWeight: "bold" }}>
            인구 <strong>1인당 카페 수: {data.인구수당_카페비율}</strong>개
          </div>
        </div>
      );
    }

    if (title === "인기 메뉴") {
        if (!Array.isArray(data)) return "❌ 데이터 없음";
        return (
          <div style={{ marginTop: "5px" }}>
            <div style={{ marginBottom: "10px", fontSize: "24px" }}>
              해당 구에서 가장 인기 있는 <strong>메뉴 Top 5</strong>입니다.
            </div>
            <ul style={{ paddingLeft: "20px", fontSize: "18px" }}>
              {data.map((item, index) => (
                <li key={index}>
                  <strong>{item.메뉴}</strong> - {item.가격.toLocaleString()}원
                </li>
              ))}
            </ul>
          </div>
        );
      }

    if (title === "메뉴 평균 가격") {
      if (!data.datasets || !data.labels) return "❌ 데이터 없음";
      return (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.raw.toLocaleString()}원`,
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (val) => `${val}원`,
                },
              },
            },
          }}
        />
      );
    }

    return "❓ 정의되지 않은 지표";
  };

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: border ? "0 0 6px rgba(0,0,0,0.1)" : "none",
        border: border ? "1px solid #ccc" : "none",
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <strong>{title}</strong>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>{renderContent()}</div>
    </div>
  );
};

export default InfoBox;
