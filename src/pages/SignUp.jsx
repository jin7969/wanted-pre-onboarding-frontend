import { useState } from "react";

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setDisabled] = useState({
    isEmail: true,
    isPassword: true,
  });

  const handleChangeUserInfo = (e) => {
    const target = e.target;
    setUserInfo((prev) => {
      return { ...prev, [target.id]: target.value };
    });

    if (target.id === "email") {
      const boolean = target.value.includes("@") ? false : true;
      setDisabled((prev) => {
        return { ...prev, isEmail: boolean };
      });
      return;
    }
    if (target.id === "password") {
      const boolean = target.value.length >= 8 ? false : true;
      setDisabled((prev) => {
        return { ...prev, isPassword: boolean };
      });
    }
  };

  return (
    <section>
      <h1>회원가입</h1>
      <form action="">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="example@email.com"
          onChange={handleChangeUserInfo}
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          data-testid="password-input"
          placeholder="8자리 이상 입력해주세요."
          onChange={handleChangeUserInfo}
          required
        />
        <button
          data-testid="signup-button"
          disabled={isDisabled.isEmail || isDisabled.isPassword}
        >
          회원가입
        </button>
      </form>
    </section>
  );
}

export default SignUp;
