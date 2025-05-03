// ✅ src/components/PipelineModal.jsx
import React from "react";
import PipelineScrollPage from "./PipelineScrollPage";
import "./PipelineModal.css";

const PipelineModal = ({ onClose }) => {
  return (
    <div className="pipeline-modal-overlay">
      <div className="pipeline-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h3 className="modal-title">🛠 주요 데이터 파이프라인</h3>
        <PipelineScrollPage />
      </div>
    </div>
  );
};

export default PipelineModal;