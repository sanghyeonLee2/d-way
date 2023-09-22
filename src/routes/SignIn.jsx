import React, { useState } from "react";
import { styled } from "styled-components";
import OAuthSignIn from "../components/OAuthSignIn";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSetRecoilState} from "recoil";
import {SignInAtom} from "../recoil/SignInAtom";

const SignInContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const SignInList = styled.ul`
  display: flex;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    min-height: 60px;
    font-weight: 700;
    color: rgb(210, 44, 38);
    background-color: rgb(255, 255, 255);
    border-top: 4px solid rgb(210, 44, 38);
    border-left: 1px solid rgb(204, 204, 204);
    border-bottom: 0px;
  }
`;
const LogInTitle = styled.div`
  margin-bottom: 70px;
`;

const LogInTypeTab = styled.div`
  width: 980px;
  margin: 0px auto;
  padding-top: 70px;
`;
const LogInType = styled.div`
  display: flex;
  margin: 0px auto;
  justify-content: center;
`;

const LogInSection = styled.div`
  width: 500px;
  .email-section {
  }
  .pw-section {
  }
  .input-email {
    width: 100%;
  }
  .input-pw {
    margin-top: 5px;
    width: 100%;
  }
  .login-btn {
    height: 46px;
    width: 100%;
  }
  .email-chkbox {
    margin: 0px;
  }
`;

const LogInForUserSection = styled.div`
  width: 60%;
  margin: 0 auto;
  .for-login-menu {
    display: flex;
  }
`;
const OauthLogInSection = styled.div`
  width: 400px;
`;
function SignIn() {
  const navigate = useNavigate();
  const [signInState, setSignInState] = useState({
    username: "",
    password: "",
  });
  const setUserInfo = useSetRecoilState(SignInAtom);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const signInHandler = (e) => {
    setSignInState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
console.log(setUserInfo);
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API_KEY}/api/auth/login`,
          signInState
      );
      if (result.status === 200) {
        localStorage.setItem("access-token",result.data.accessToken);
        localStorage.setItem("refresh-token",result.data.refreshToken);
        setUserInfo(signInState.username);
        console.log(result.data);
        alert("로그인 성공");
        navigate("/");
      }
    } catch (err) {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
      console.log(err);
    }
  };
  return (
    <>
      <SignInContainer>
        <div>
          <div>
            <LogInTitle>
              <h1>로그인</h1>
            </LogInTitle>
            <div>
              <SignInList>
                <li>
                  <span>회원 로그인</span>
                </li>
                <li>
                  <span>비회원 로그인</span>
                </li>
                <li>
                  <span>예약조회</span>
                </li>
                <li>
                  <span>온라인 체크인</span>
                </li>
              </SignInList>
            </div>
          </div>
          <LogInTypeTab>
            <LogInType>
              <LogInSection>
                <form onSubmit={signInSubmit}>
                  <div className="email-section">
                    <input
                      name="username"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      className="input-email"
                      onChange={signInHandler}
                    />
                  </div>
                  <div className="pw-section">
                    <input
                      name="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      className="input-pw"
                      onChange={signInHandler}
                      autoComplete="on"
                    />
                  </div>
                  {/* <span>
                    <input type="checkbox" className="email-chkbox" />
                    <>아이디 저장</
                  </span> */}
                  <br />
                  <button type="submit" className="login-btn">
                    로그인
                  </button>
                  <LogInForUserSection>
                    <ul className="for-login-menu">
                      <li>
                        <Link to={"/signup"}>회원가입</Link>
                      </li>
                      <hr />
                      <li>아이디찾기</li>
                      <hr />
                      <li>비밀번호 찾기</li>
                    </ul>
                  </LogInForUserSection>
                </form>
              </LogInSection>
              <hr />
              <OauthLogInSection>
                <OAuthSignIn />
              </OauthLogInSection>
            </LogInType>
          </LogInTypeTab>
        </div>
      </SignInContainer>
    </>
  );
}

export default SignIn;
