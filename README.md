## 구현 요구 사항 목록

### 1. 로그인 / 회원가입

- [x] /signup 경로에 회원가입 기능을 개발해주세요
- [x] /signin 경로에 로그인 기능을 개발해주세요
- [x] 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성해주세요
  - [x] 이메일 input에 data-testid="email-input" 속성을 부여해주세요
  - [x] 패스워드 input에 data-testid="password-input" 속성을 부여해주세요
  - [x] 회원가입 button에 data-testid="signup-button" 속성을 부여해주세요
  - [x] 로그인 button에 data-testid="signin-button" 속성을 부여해주세요

**Assignment 1** | 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

- [x] 이메일 조건: @ 포함
- [x] 비밀번호 조건: 8자 이상
- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요

**Assignment 2**

- [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동해주세요

**Assignment 3**

- [ ] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요
- [ ] 응답받은 JWT는 로컬 스토리지에 저장해주세요

**Assignment 4** | 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

- [ ] 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
- [ ] 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요
