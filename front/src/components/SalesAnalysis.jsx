import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesChart from "./SalesChart";
import SeoulMap from "./SeoulMap";

const FASTAPI_URL = process.env.REACT_APP_FASTAPI_URL; // ✅ FastAPI 주소 환경변수로 관리

const normalizeYearlyData = (data, divisor = 365) => {
  const result = {};
  for (const key in data) {
    result[key] = Math.round(data[key] / divisor);
  }
  return result;
};

const getMaxKey = (obj) =>
  Object.entries(obj).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

const SalesAnalysis = () => {
  const [selectedGu, setSelectedGu] = useState("종로구");
  const [salesData, setSalesData] = useState(null);

  const [gender, setGender] = useState("");
  const [genderGap, setGenderGap] = useState("");
  const [topAge, setTopAge] = useState("");
  const [topAgeValue, setTopAgeValue] = useState("");
  const [topDay, setTopDay] = useState("");
  const [topDayValue, setTopDayValue] = useState("");
  const [topTime, setTopTime] = useState("");
  const [topTimeValue, setTopTimeValue] = useState("");

  useEffect(() => {
    axios
      .get(`${FASTAPI_URL}/sales/${selectedGu}`) // ✅ 환경변수 적용
      .then((res) => {
        setSalesData(res.data);
        const normalized = normalizeYearlyData(res.data);

        const genderType =
          normalized["여성"] > normalized["남성"] ? "여성" : "남성";
        const genderDiff = Math.abs(
          normalized["여성"] - normalized["남성"]
        ).toLocaleString();
        setGender(genderType);
        setGenderGap(genderDiff);

        const ageKeys = {
          "10대": normalized["연령_10"],
          "20대": normalized["연령_20"],
          "30대": normalized["연령_30"],
          "40대": normalized["연령_40"],
          "50대": normalized["연령_50"],
          "60대 이상": normalized["연령_60"],
        };
        const topA = getMaxKey(ageKeys);
        setTopAge(topA);
        setTopAgeValue(ageKeys[topA].toLocaleString());

        const dayKeys = {
          월: normalized["월"],
          화: normalized["화"],
          수: normalized["수"],
          목: normalized["목"],
          금: normalized["금"],
          토: normalized["토"],
          일: normalized["일"],
        };
        const topD = getMaxKey(dayKeys);
        setTopDay(topD);
        setTopDayValue(dayKeys[topD].toLocaleString());

        const timeKeys = {
          "00~06시": normalized["00_06"],
          "06~11시": normalized["06_11"],
          "11~14시": normalized["11_14"],
          "14~17시": normalized["14_17"],
          "17~21시": normalized["17_21"],
          "21~24시": normalized["21_24"],
        };
        const topT = getMaxKey(timeKeys);
        setTopTime(topT);
        setTopTimeValue(timeKeys[topT].toLocaleString());
      })
      .catch((err) => console.error("데이터 요청 실패:", err));
  }, [selectedGu]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: "1 1 500px", maxWidth: "700px", minWidth: "320px" }}>
        <SeoulMap onGuClick={setSelectedGu} selectedGu={selectedGu} />

        {salesData && (
          <>
            <div
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "16px",
                color: "#333",
                lineHeight: "1.6",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
              }}
            >
              <div>
                <strong>{gender}</strong> 소비자의 매출이 더 높으며, 일평균{" "}
                <strong>{genderGap}원</strong> 차이가 납니다.
              </div>
              <div>
                <strong>{topAge}</strong> 연령대의 소비가 가장 높으며, 일평균{" "}
                <strong>{topAgeValue}원</strong>입니다.
              </div>
              <div>
                <strong>{topDay}요일</strong>의 매출이 가장 높으며, 일평균{" "}
                <strong>{topDayValue}원</strong>입니다.
              </div>
              <div>
                <strong>{topTime}</strong> 시간대에 매출이 가장 많으며, 일평균{" "}
                <strong>{topTimeValue}원</strong>입니다.
              </div>
            </div>
            <SalesChart
              title="성별 매출"
              type="bar"
              height={180}
              data={normalizeYearlyData({
                남성: salesData["남성"],
                여성: salesData["여성"],
              })}
            />
          </>
        )}
      </div>

      <div
        style={{
          flex: "1 1 700px",
          maxWidth: "800px",
          minWidth: "320px",
          paddingRight: "20px",
          marginLeft: "40px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>{selectedGu} 매출 분석</h2>

        {salesData ? (
          <>
            <SalesChart
              title="연령대별 매출"
              height={180}
              data={normalizeYearlyData({
                "10대": salesData["연령_10"],
                "20대": salesData["연령_20"],
                "30대": salesData["연령_30"],
                "40대": salesData["연령_40"],
                "50대": salesData["연령_50"],
                "60대 이상": salesData["연령_60"],
              })}
            />
            <SalesChart
              title="요일별 매출"
              height={180}
              data={normalizeYearlyData({
                월: salesData["월"],
                화: salesData["화"],
                수: salesData["수"],
                목: salesData["목"],
                금: salesData["금"],
                토: salesData["토"],
                일: salesData["일"],
              })}
            />
            <SalesChart
              title="시간대별 매출"
              height={180}
              data={normalizeYearlyData({
                "00~06시": salesData["00_06"],
                "06~11시": salesData["06_11"],
                "11~14시": salesData["11_14"],
                "14~17시": salesData["14_17"],
                "17~21시": salesData["17_21"],
                "21~24시": salesData["21_24"],
              })}
            />
          </>
        ) : (
          <p>📡 데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default SalesAnalysis;
