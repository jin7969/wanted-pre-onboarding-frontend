import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES, USER_DATA } from "../constants";

function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setDisabled] = useState({
    isEmail: true,
    isPassword: true,
  });

  const handleChangeUserData = (e) => {
    const target = e.target;
    setUserData((prev) => {
      return { ...prev, [target.id]: target.value };
    });

    if (target.id === "email") {
      const boolean = target.value.includes(USER_DATA.EMAIL_ADDRESS_FORMAT)
        ? false
        : true;
      setDisabled((prev) => {
        return { ...prev, isEmail: boolean };
      });
      return;
    }
    if (target.id === "password") {
      const boolean =
        target.value.length >= USER_DATA.PASSWORD_MIN_LENGTH ? false : true;
      setDisabled((prev) => {
        return { ...prev, isPassword: boolean };
      });
    }
  };

  const handleUserDataSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.SIGNIN);
  };

  return (
    <main>
      <h1>회원가입</h1>
      <form onSubmit={handleUserDataSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="example@email.com"
          onChange={handleChangeUserData}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          data-testid="password-input"
          placeholder="8자리 이상 입력해주세요."
          onChange={handleChangeUserData}
          required
        />
        <button
          data-testid="signup-button"
          disabled={isDisabled.isEmail || isDisabled.isPassword}
        >
          회원가입
        </button>
      </form>
    </main>
  );
}

export default SignUp;
