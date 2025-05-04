import React from "react";

const KeywordGraph = ({ imageUrl }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "16px", // ✅ 모달 안 둥근 테두리 고려
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      {/* ✅ 이미지 위에 추가 요소가 있다면 여기에 추가 */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          padding: "20px",
        }}
      >
        {/* 예시 텍스트 또는 그래프 삽입 가능 */}
      </div>
    </div>
  );
};

export default KeywordGraph;
