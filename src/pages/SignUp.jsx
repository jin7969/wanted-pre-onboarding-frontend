import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import useUserDataForm from "../hooks/useUserDataForm";

function SignUp() {
  const navigate = useNavigate();
  const { userData, handleChangeUserData, isDisabled } = useUserDataForm();

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
