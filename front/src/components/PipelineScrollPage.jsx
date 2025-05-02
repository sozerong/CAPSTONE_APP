import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./hideScrollbar.css";

const steps = [
  {
    title: "YouTube",
    color: "#e53935",
    desc: "콘텐츠 수집 출발점",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/youtube.png"
  },
  {
    title: "Kafka",
    color: "#1e88e5",
    desc: "데이터 스트리밍 처리",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/kafka.png"
  },
  {
    title: "Spark",
    color: "#43a047",
    desc: "대규모 데이터 전처리",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/spark.png"
  },
  {
    title: "LLM Agent",
    color: "#fbc02d",
    desc: "키워드 관련 정보 추출",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/llmagent.png"
  },
  {
    title: "Neo4j",
    color: "#8e24aa",
    desc: "지식그래프 저장소",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/neo4j.png"
  },
  {
    title: "GraphRAG",
    color: "#00acc1",
    desc: "그래프 기반 추천 생성",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/graphrag.png"
  },
  {
    title: "Elasticsearch",
    color: "#6d4c41",
    desc: "검색용 인덱싱",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/elasticsearch.png"
  },
  {
    title: "FastAPI",
    color: "#5e35b1",
    desc: "응답 처리 및 제공",
    image: "https://raw.githubusercontent.com/your-username/your-repo/main/images/fastapi.png"
  }
];

const StepSection = ({ title, desc, color, image }) => {
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
        backgroundColor: "#fdfdfd",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px"
      }}
    >
      <motion.div
        style={{
          backgroundColor: color,
          padding: "30px 60px",
          borderRadius: "20px",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px"
        }}
      >
        {title}
      </motion.div>
      <motion.p
        style={{
          fontSize: "1.2rem",
          color: "#333",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        {desc}
      </motion.p>
      {image && (
        <motion.img
          src={image}
          alt={`${title} 결과`}
          style={{
            maxWidth: "70%",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        />
      )}
    </motion.section>
  );
};

const PipelineScrollPage = () => {
  return (
    <div className="hide-scrollbar">
      {steps.map((s, i) => (
        <StepSection key={i} title={s.title} desc={s.desc} color={s.color} image={s.image} />
      ))}
    </div>
  );
};

export default PipelineScrollPage;
