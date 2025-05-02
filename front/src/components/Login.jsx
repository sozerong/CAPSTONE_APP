import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ 환경변수에서 API 주소 불러오기
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/accounts/login/`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ 로그인 응답:", res.data);

      if (res.data && res.data.access) {
        localStorage.setItem("token", res.data.access);
        navigate("/");
      } else {
        setError("❌ 서버로부터 토큰을 받지 못했습니다.");
      }
    } catch (err) {
      console.error("❌ 로그인 실패:", err.response?.data || err.message);
      setError("로그인 실패: 아이디 또는 비밀번호를 확인해주세요");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px"
        }}>🔐 로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0284c7",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          로그인
        </button>

        {error && (
          <p style={{
            color: "red",
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
