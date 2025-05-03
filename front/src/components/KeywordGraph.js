import React from "react";

const KeywordGraph = ({ videoUrl }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000", // ✅ 로딩 중 깜빡임 방지용
      }}
    >
      {/* ✅ 영상 배경 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          backgroundColor: "#000", // ✅ 재확인용
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        ※ 브라우저가 비디오를 지원하지 않습니다. ※
      </video>
    </div>
  );
};

export default KeywordGraph;
