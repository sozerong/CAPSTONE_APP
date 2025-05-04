import React from "react";

const VideoModal = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src="https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/web.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          zIndex: 10000,
        }}
      />

      {/* ✔ Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          fontSize: "28px",
          color: "white",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 10001,
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default VideoModal;