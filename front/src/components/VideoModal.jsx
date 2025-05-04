import React from "react";

const VideoModal = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          maxWidth: "960px",
          backgroundColor: "black",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10000,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <video
          src="https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/web.mp4"
          controls
          autoPlay
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
};

export default VideoModal;
