// SalesAnalysis.js
import React from "react";

const SalesAnalysis = () => {
  return (
    <div>
      <h2>우리동네 매출 분석</h2>
      <p>지역 기반 매출 데이터를 시각화하여 보여줍니다.</p>
      <img src="/graph_sample.png" alt="매출 그래프" style={{ width: '100%', height: 200 }} />
    </div>
  );
};

export default SalesAnalysis;