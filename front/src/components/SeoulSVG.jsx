import React, { useState } from "react";

const guList = [
    { name: "종로구", top: 310, left: 375, width: 40, height: 20 },
    { name: "중구", top: 375, left: 410, width: 30, height: 18 },
    { name: "용산구", top: 435, left: 380, width: 45, height: 20 },
    { name: "서대문구", top: 330, left: 295, width: 50, height: 20 },
    { name: "은평구", top: 240, left: 285, width: 42, height: 23 },
    { name: "마포구", top: 375, left: 250, width: 40, height: 20 },
    { name: "성북구", top: 275, left: 445, width: 45, height: 22 },
    { name: "강북구", top: 190, left: 440, width: 45, height: 22 },
    { name: "도봉구", top: 135, left: 482, width: 45, height: 22 },
    { name: "노원구", top: 153, left: 555, width: 45, height: 22 },
    { name: "동대문구", top: 320, left: 515, width: 50, height: 22 },
    { name: "중랑구", top: 280, left: 590, width: 45, height: 22 },
    { name: "광진구", top: 400, left: 580, width: 45, height: 23 },
    { name: "성동구", top: 390, left: 495, width: 45, height: 22 },
    { name: "강동구", top: 400, left: 680, width: 48, height: 25 },
    { name: "송파구", top: 500, left: 630, width: 40, height: 20 },
    { name: "강남구", top: 530, left: 525, width: 42, height: 23 },
    { name: "서초구", top: 545, left: 430, width: 45, height: 25 },
    { name: "동작구", top: 500, left: 320, width: 45, height: 25 },
    { name: "관악구", top: 580, left: 315, width: 45, height: 30 },
    { name: "금천구", top: 600, left: 230, width: 45, height: 25 }, 
    { name: "구로구", top: 515, left: 140, width: 45, height: 25 },
    { name: "양천구", top: 460, left: 145, width: 45, height: 28 },
    { name: "영등포구", top: 460, left: 240, width: 50, height: 25 },
    { name: "강서구", top: 362, left: 95, width: 45, height: 25 }
  ];
  

const SeoulSVG = ({ onGuClick }) => {
  const [selectedGu, setSelectedGu] = useState(null);

  const handleClick = (name) => {
    setSelectedGu(name);
    onGuClick(name);
  };

  return (
    <div style={{ position: "relative", width: "800px", margin: "0 auto" }}>
      <img
        src="https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/SeoulSVG.png"
        alt="서울시 자치구 지도"
        style={{ width: "100%", display: "block" }}
      />
      {guList.map((gu) => (
        <div
          key={gu.name}
          onClick={() => handleClick(gu.name)}
          title={gu.name}
          style={{
            position: "absolute",
            top: gu.top,
            left: gu.left,
            width: gu.width,
            height: gu.height,
            cursor: "pointer",
            backgroundColor:
              selectedGu === gu.name ? "rgba(25, 118, 210, 0.3)" : "rgba(0,0,0,0)",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            zIndex: 5,
          }}
        />
      ))}
    </div>
  );
};

export default SeoulSVG;
