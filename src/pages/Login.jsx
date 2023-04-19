import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES } from "../constants";
import useUserDataForm from "../hooks/useUserDataForm";

function Login() {
  const navigate = useNavigate();
  const { email, password, handleUserDataChange, isDisabled } =
    useUserDataForm();

  const handleLoginDataSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          alert("로그인되었습니다.");
          navigate(ROUTES.TODO);
        } else throw data.message;
      })
      .catch((error) =>
        alert(`로그인 중 에러가 발생했습니다. \n에러내용: ${error}`)
      );
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate(ROUTES.TODO);
      alert("로그인 상태입니다.");
    }
  }, []);

  return (
    <main>
      <h1>로그인</h1>
      <form onSubmit={handleLoginDataSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          data-testid="email-input"
          placeholder="example@email.com"
          onChange={handleUserDataChange}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          data-testid="password-input"
          placeholder="8자리 이상 입력해주세요."
          onChange={handleUserDataChange}
          required
        />
        <button
          data-testid="signin-button"
          disabled={isDisabled.isEmail || isDisabled.isPassword}
        >
          로그인
        </button>
      </form>
      <Link to={ROUTES.SIGN_UP}>회원가입</Link>
    </main>
  );
}

export default Login;
