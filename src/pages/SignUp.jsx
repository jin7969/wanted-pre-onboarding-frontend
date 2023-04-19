import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES, STORAGE_TOKEN_KEY } from "../constants";
import useUserDataForm from "../hooks/useUserDataForm";

function SignUp() {
  const navigate = useNavigate();
  const { email, password, handleUserDataChange, isDisabled } =
    useUserDataForm();

  const handleSignUpDataSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => {
        if (data.status === 201) {
          alert("회원가입이 완료되었습니다.");
          navigate(ROUTES.HOME);
        } else throw data.status;
      })
      .catch((error) =>
        alert(`회원가입 중 에러가 발생했습니다. \n에러코드 : ${error}`)
      );
  };

  useEffect(() => {
    if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
      navigate(ROUTES.TODO);
      alert("로그인 상태입니다.");
    }
  }, []);

  return (
    <section>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUpDataSubmit}>
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
          data-testid="signup-button"
          disabled={isDisabled.isEmail || isDisabled.isPassword}
        >
          회원가입
        </button>
      </form>
      <Link to={ROUTES.HOME}>뒤로가기</Link>
    </section>
  );
}

export default SignUp;
