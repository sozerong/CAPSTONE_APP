import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); 

    try {
      const res = await axios.post(
        `${API_URL}/api/accounts/login/`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data && res.data.access) {
        localStorage.setItem("token", res.data.access);
        onLogin(); // 상태 반영
        navigate("/"); // 이동
      } else {
        setError("❌ 서버로부터 토큰을 받지 못했습니다.");
      }
    } catch (err) {
      console.error("❌ 로그인 실패:", err.response ? err.response.data : err.message);
      setError("❌ 로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          🔐 로그인
        </h2>
        <h5>ID : test1 / PW : test123</h5>

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
            fontSize: "15px",
          }}
          disabled={isLoading} 
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
            fontSize: "15px",
          }}
          disabled={isLoading} 
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0284c7",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={isLoading} 
        >
          {isLoading ? (
            <>
              <div
                className="spinner"
                style={{
                  width: "20px",
                  height: "20px",
                  border: "3px solid #fff",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "10px",
                }}
              ></div>
              로딩 중...
            </>
          ) : (
            "로그인"
          )}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </form>

      {/*  스피너 애니메이션 */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
