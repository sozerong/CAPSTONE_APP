import React from "react";

const KeywordGraph = ({ videoUrl }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ✅ 영상 배경 */}
      <video
        src={videoUrl}
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
        }}
      >
        ※브라우저가 영상을 지원하지 않습니다.※
      </video>
    </div>
  );
};

export default KeywordGraph;
