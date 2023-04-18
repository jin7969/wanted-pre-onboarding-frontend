function SignUp(props) {
  return (
    <section>
      <h1>회원가입</h1>
      <form action="">
        <label htmlFor="">이메일</label>
        <input
          type="email"
          data-testid="email-input"
          placeholder="example@email.com"
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          data-testid="password-input"
          placeholder="8자리 이상 입력해주세요."
        />
        <button data-testid="signup-button">회원가입</button>
      </form>
    </section>
  );
}

export default SignUp;
