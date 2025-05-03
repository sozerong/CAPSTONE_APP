// SeoulMap.jsx
import React from "react";

const districts = [
  "종로구", "중구", "용산구", "성동구", "광진구",
  "동대문구", "중랑구", "성북구", "강북구", "도봉구",
  "노원구", "은평구", "서대문구", "마포구", "양천구",
  "강서구", "구로구", "금천구", "영등포구", "동작구",
  "관악구", "서초구", "강남구", "송파구", "강동구"
];

const SeoulMap = ({ onGuClick, selectedGu }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h3>자치구 선택</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {districts.map((gu) => (
          <div
            key={gu}
            onClick={() => onGuClick(gu)}
            style={{
              padding: "8px 14px",
              backgroundColor: selectedGu === gu ? "#1976d2" : "#e0e0e0",
              color: selectedGu === gu ? "#fff" : "#333",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.3s"
            }}
          >
            {gu}
          </div>
        ))}
      </div>
      
    </div>
    
  );
};

export default SeoulMap;
