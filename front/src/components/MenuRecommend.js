import React, { useState, useEffect } from "react";
import axios from "axios";
import KeywordGraph from "./KeywordGraph.js";
import PipelineModal from "./PipelineModal";

const FASTAPI_URL = process.env.REACT_APP_FASTAPI_URL; // ✅ 환경변수로 API 주소 설정

const KEYWORDS = [
  "최근 유행하는 재료",
  "SNS에서 핫한 메뉴",
  "카페 신메뉴 추천",
  "달콤한 메뉴가 필요할 때",
  "비주얼이 예쁜 메뉴",
  "계절 한정 디저트"
];

const KeywordRecommend = () => {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [graphLoading, setGraphLoading] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [showScrollTip, setShowScrollTip] = useState(true);
  const [scrollTipHide, setScrollTipHide] = useState(false);

  const fetchData = async (keyword) => {
    try {
      setLoading(true);
      const res = await axios.get(`${FASTAPI_URL}/search?query=${encodeURIComponent(keyword)}`); // ✅ 수정됨
      setResult(res.data[0]);
    } catch (err) {
      console.error("❌ API 오류:", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (keyword) => {
    setSelected(keyword);
    await fetchData(keyword);
  };

  const openGraphModal = async () => {
    console.log("🧠 [지식그래프 구경하기] 버튼 클릭");
    try {
      setGraphLoading(true);
      const res = await axios.get(`${FASTAPI_URL}/graph?all=true`); // ✅ 수정됨
      setGraphData(res.data);
      setShowGraph(true);
    } catch (err) {
      console.error("❌ 전체 그래프 API 오류:", err);
    } finally {
      setGraphLoading(false);
    }
  };

  useEffect(() => {
    if (showPipeline || showGraph) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPipeline, showGraph]);

  useEffect(() => {
    if (showPipeline) {
      setTimeout(() => {
        setScrollTipHide(true);
        setTimeout(() => setShowScrollTip(false), 600);
      }, 1500);
    }
  }, [showPipeline]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ marginBottom: "20px" }}>🔍 궁금한 키워드를 선택하세요</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
        {KEYWORDS.map((kw, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(kw)}
            style={{
              padding: "10px 18px",
              borderRadius: "30px",
              border: selected === kw ? "2px solid #2196f3" : "1px solid #ccc",
              backgroundColor: selected === kw ? "#e3f2fd" : "#f9f9f9",
              color: "#333",
              fontWeight: selected === kw ? "bold" : "normal",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            #{kw}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <img src="/spinner.gif" alt="로딩 중" style={{ width: "50px" }} />
        </div>
      )}

      {!loading && result && (
        <>
          <h3 style={{ marginBottom: "10px" }}>❓ {result.question}❓</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
            {result.recommendations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                }}
              >
                <h4 style={{ marginBottom: "10px", color: "#1a237e", fontWeight: "bold", fontSize: "16px" }}>{item.name}</h4>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <button
          onClick={openGraphModal}
          style={{
            padding: "12px 24px",
            backgroundColor: "#1a237e",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🧠 지식그래프 구경하기
        </button>

        <button
          onClick={() => {
            setShowScrollTip(true);
            setScrollTipHide(false);
            setShowPipeline(true);
          }}
          style={{
            marginLeft: "20px",
            padding: "12px 24px",
            backgroundColor: "#00838f",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🧩 파이프라인 구경하기
        </button>
      </div>

      {showGraph && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "90%",
              height: "80%",
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowGraph(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                fontWeight: "bold",
              }}
            >
              X
            </button>
            <h4 style={{ marginBottom: "15px" }}>📌 지식그래프 </h4>
            <div style={{ height: "90%", width: "100%" }}>
              {/* ✅ 이미지 기반으로 변경 */}
              <KeywordGraph imageUrl="https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/neo4j_2.png" />
            </div>
          </div>
        </div>
      )}


      {showPipeline && (
        <>
          {showScrollTip && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "white",
                zIndex: 10000,
                opacity: scrollTipHide ? 0 : 1,
                transition: "opacity 0.6s ease"
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>⬇  아래로 스크롤하세요  ⬇</div>
              <div style={{ fontSize: "3rem" }}>👇</div>
            </div>
          )}
          <PipelineModal onClose={() => setShowPipeline(false)} showScrollTip={showScrollTip} onScrollDetected={() => setShowScrollTip(false)} />
        </>
      )}
    </div>
  );
};

export default KeywordRecommend;
