import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxiosWithAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // 401이면 토큰 만료로 간주
        if (error.response && error.response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("token");
          navigate("/login"); // 로그인 페이지로 이동
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트 언마운트 시 인터셉터 제거
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosWithAuth;
