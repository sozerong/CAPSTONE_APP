import React from "react";

const KeywordGraph = ({ videoUrl }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <video
        src={videoUrl}
        controls
        autoPlay
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
       ※브라우저가 영상을 지원하지 않습니다.※
      </video>
    </div>
  );
};

export default KeywordGraph;
