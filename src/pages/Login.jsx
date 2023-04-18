import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import useUserDataForm from "../hooks/useUserDataForm";

function Login() {
  const { userData, handleChangeUserData, isDisabled } = useUserDataForm();

  return (
    <main>
      <h1>로그인</h1>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={userData.email}
          data-testid="email-input"
          placeholder="example@email.com"
          onChange={handleChangeUserData}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={userData.password}
          data-testid="password-input"
          placeholder="8자리 이상 입력해주세요."
          onChange={handleChangeUserData}
          required
        />
        <button
          data-testid="signin-button"
          disabled={isDisabled.isEmail || isDisabled.isPassword}
        >
          로그인
        </button>
      </form>
      <Link to={ROUTES.SIGNUP}>회원가입</Link>
    </main>
  );
}

export default Login;
