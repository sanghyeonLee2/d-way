import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpContainer = styled.div`
  h1 {
    display: block;
  }
`;
const SignUpSection = styled.div`
  input {
    display: block;
    height: 30px;
  }
`;
function SignUp() {
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    korFirstName: "",
    korLastName: "",
    engFirstName: "",
    engLastName: "",
    gender: "",
    birthDay: "",
    email: "",
    phoneCountry: "",
    phone: "",
    country: "",
  });

  const formHandler = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUpSubmit = async (e) => {
    e.preventDefault();
    if (formState.password !== formState.passwordConfirm) {
      alert("암호가 틀립니다.");
      return;
    }
    try {
      const result = await axios.post(
        `${API_KEY}/api/auth/registration`,
        formState
      );
      if (result.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(formState);

  return (
    <SignUpContainer>
      <h1>회원가입</h1>
      <SignUpSection>
        <form className="signup-form" onSubmit={signUpSubmit}>
          아이디 <input type="text" name="username" onChange={formHandler} />
          비밀번호
          <input type="password" name="password" onChange={formHandler} />
          비밀번호 확인
          <input
            type="password"
            name="passwordConfirm"
            onChange={formHandler}
          />
          성
          <input type="text" name="korFirstName" onChange={formHandler} />
          이름
          <input type="text" name="korLastName" onChange={formHandler} />
          영문 이름
          <input type="text" name="engFirstName" onChange={formHandler} />
          영문 성
          <input type="text" name="engLastName" onChange={formHandler} />
          성별 <input type="text" name="gender" onChange={formHandler} />
          생년월일 <input type="date" name="birthDay" onChange={formHandler} />
          이메일 <input type="email" name="email" onChange={formHandler} />
          휴대전화 국가
          <input type="text" name="phoneCountry" onChange={formHandler} />
          휴대전화 번호
          <input type="tel" name="phone" onChange={formHandler} />
          국가 <input type="text" name="country" onChange={formHandler} />
          <button type="submit">회원가입</button>
        </form>
      </SignUpSection>
    </SignUpContainer>
  );
}

export default SignUp;
