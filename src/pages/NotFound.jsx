import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NotFound() {
  return (
    <S.Container>
      <S.NumberWrapper>
        <span>404</span>
      </S.NumberWrapper>
      <span>잘못된 주소입니다!</span>
      <Link to="/">홈으로 이동하기</Link>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    span {
      margin-bottom: 10px;
    }
  `,

  NumberWrapper: styled.div`
    span {
      font-size: 150px;
      font-weight: 900;
      opacity: 0.3;
      color: #bebebe;
    }
  `,
};
