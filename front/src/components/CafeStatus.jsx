import React, { useState } from "react";
import SeoulSVG from "./SeoulSVG";
import InfoBox from "./InfoBox";
import VideoModal from "./VideoModal"; // ✅ 영상 모달 컴포넌트 추가

const CafeStatus = () => {
  const [selectedGu, setSelectedGu] = useState(null);
  const [showVideo, setShowVideo] = useState(false); // ✅ 영상 모달 상태

  return (
    <div style={{ position: "relative", padding: "30px" }}>
      {/* ✅ 초기 안내 문구 */}
      {!selectedGu && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#555",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.8)",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          지도를 클릭하여 자치구를 선택해주세요
        </div>
      )}

      {/* ✅ 전체 컨테이너 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "900px",
          marginTop: "50px",
        }}
      >
        {/* ✅ 서울 지도 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "800px",
            position: "relative",
          }}
        >
          <SeoulSVG onGuClick={setSelectedGu} />
        </div>

        {/* ✅ 자치구 선택 시 박스들 */}
        {selectedGu && (
          <>
            <div style={{ position: "absolute", top: "0px", left: "190px", width: "300px" }}>
              <InfoBox title="카페 수" gu={selectedGu} />
            </div>
            <div style={{ position: "absolute", top: "0px", right: "250px", width: "400px" }}>
              <InfoBox title="인구 : 카페 비율" gu={selectedGu} />
            </div>
            <div style={{ position: "absolute", top: "450px", left: "60px", width: "500px" }}>
              <InfoBox title="인기 메뉴" gu={selectedGu} />
            </div>
            <div
              style={{
                position: "absolute",
                top: "450px",
                right: "50px",
                width: "500px",
                height: "300px",
              }}
            >
              <InfoBox title="메뉴 평균 가격" gu={selectedGu} />
            </div>
          </>
        )}
      </div>

      {/* ✅ 영상 보기 버튼 */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => setShowVideo(true)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ▶ 수집과정 구경하기
        </button>
      </div>

      {/* ✅ 영상 모달 */}
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
    </div>
  );
};

export default CafeStatus;
