import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./hideScrollbar.css";

const steps = [
  {
    logo: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/youtube_logo.png",
    color: "#e53935",
    desc: "콘텐츠 수집 출발점",
    image: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/youtube.png",
    descColor: "#111" 
  },
  {
    logo: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/kafka_logo.png",
    color: "#1e88e5",
    desc: "실시간 영상 데이터 수집",
    video: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/kafka.mp4",
    descColor: "#fff" 
  },
  {
    logo: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/spark_logo.png",
    color: "#43a047",
    desc: "영상 데이터 전처리",
    video: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/spark.mp4",
    descColor: "#fff"
  },
  {
    logo: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/langchain_logo.png",
    color: "#fbc02d",
    desc: "키워드 관련 정보 추출",
    image: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/langchain.png",
    descColor: "#111" 
  },
  {
    logo: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/neo4j_logo.png",
    color: "#8e24aa",
    desc: "지식그래프 저장소 및 추론",
    image: "https://raw.githubusercontent.com/sozerong/SMU_CAPSTONE_IMG/main/neo4j.png",
    descColor: "#111" 
  },
];

const StepSection = ({ logo, desc, descColor , image, video }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      className="step-section"
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        hidden: { opacity: 0, y: 100 }
      }}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px",
        color: "#fff",
        backgroundImage: video ? "none" : `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*  영상 배경 */}
      {video && (
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
          }}
          src={video}
        />
      )}

      <motion.img
        src={logo}
        alt="logo"
        style={{
          zIndex: 1,
          maxWidth: "250px",
          maxHeight: "120px",
          marginBottom: "20px",
          filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.5))",
          borderRadius: "12px" //  둥근 모서리 적용
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />

      <motion.p
          style={{
            zIndex: 1,
            fontSize: "1.4rem",
            color: descColor || "#111", 
            fontWeight: "600",
            maxWidth: "600px",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          {desc}
        </motion.p>

    </motion.section>
  );
};

const PipelineScrollPage = () => {
  return (
    <div className="hide-scrollbar">
      {steps.map((s, i) => (
        <StepSection
          key={i}
          logo={s.logo}
          desc={s.desc}
          color={s.color}
          image={s.image}
          video={s.video}
          descColor={s.descColor} 

        />
      ))}
    </div>
  );
};

export default PipelineScrollPage;
