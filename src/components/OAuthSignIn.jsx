import React from "react";
import { styled } from "styled-components";
const SnsList = styled.ul`
  display: flex;
  justify-content: center;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    width: 60px;
    height: 60px;
  }
  .sns1 {
    background-image: url(//contents-image.twayair.com/homepage/images/ico/ico_kakao.svg);
    background-repeat: no-repeat;
  }

  .sns2 {
    background-image: url(//contents-image.twayair.com/homepage/images/member/ico_naver.svg);
    background-repeat: no-repeat;
  }

  .sns3 {
    background-image: url(//contents-image.twayair.com/homepage/images/member/ico_line.svg);
    background-repeat: no-repeat;
  }
  .sns4 {
    background-image: url(//contents-image.twayair.com/homepage/images/member/ico_apple.svg);
    background-repeat: no-repeat;
  }
  .sns5 {
    background-image: url(//contents-image.twayair.com/homepage/images/member/ico_facebook.svg);
    background-repeat: no-repeat;
  }
`;
function OAuthSignIn(props) {
  return (
    <>
      <strong>SNS 서비스 계정으로 로그인</strong>
      <div>
        <SnsList>
          <li className="sns1">
            <span></span>
          </li>
          <li className="sns2">
            <span></span>
          </li>
          <li className="sns3">
            <span></span>
          </li>
          <li className="sns4">
            <span></span>
          </li>
          <li className="sns5">
            <span></span>
          </li>
        </SnsList>
      </div>
    </>
  );
}

export default OAuthSignIn;
