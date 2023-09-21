import axios from "axios";
import React, {useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const SignUpContainer = styled.div`
  h1 {
    display: block;
  }
`;
const SignUpSection = styled.fieldset`
  input {
    display: block;
    height: 30px;
  }
`;

function SignUp() {
    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [duplicated, setDuplicated] = useState(false)
    const [regionCountry, setRegionCountry] = useState();
    const reducer = (state, action) => {
        switch (action.type) {
            case "username":
                return {
                    ...state, [action.type]: action.value
                }
            case "password":
            case "passwordConfirm":
                return {
                    ...state, [action.type]: action.value
                }
            case "korFirstName":
            case "korLastName":
                return {
                    ...state, [action.type]: action.value
                }
            case "engFirstName" :
            case "engLastName":
                return {
                    ...state, [action.type]: action.value.toUpperCase()
                }
            case "gender":
                return {
                    ...state, [action.type]: action.value
                }
            case "birthDay" :
            case "email":
            case "phone":
                return {
                    ...state, [action.type]: action.value
                }
            case "phoneCountry" :
            case "country":
                const countryCode = regionCountry.find((country) => country.korName === action.value).code2
                return {
                    ...state, [action.type]: countryCode
                }
            default: return;
        }
    }
    const [state, dispatch] = useReducer(reducer, {
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

    useEffect(() => {
        const fetchRegion = async () => {
            const result = await axios.get(
                `${API_KEY}/api/region/country`
            );
            setRegionCountry(result.data.countries)
            console.log(result.data)
        }
        fetchRegion();
    }, [API_KEY]);

    const duplicateConfirm = async () => {
        const {username} = state;
        try {
            const result = await axios.get(`${API_KEY}/api/auth/check-duplication`, {params: {username}});
            if ((result.status === 200) && (result.data.username === username)) {
                alert("아이디가 중복됩니다");
                return duplicated && setDuplicated(false);
            }
            if ((result.status === 200) && (result.data.username !== username)) {
                alert("사용가능한 아이디 입니다");
                return setDuplicated(true);
            }
        } catch (err) {
            alert("에러가 발생 했습니다.")
            console.log(err)
        }
    }

    const signUpSubmit = async (e) => {
        e.preventDefault();
        if (state.password !== state.passwordConfirm) {
            alert("암호가 틀립니다.");
            return;
        }
        try {
            const result = await axios.post(
                `${API_KEY}/api/auth/registration`,
                state
            );
            if (result.status === 200 && duplicated === true) {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <SignUpContainer>
            <SignUpSection>
                <legend><h1>회원가입</h1></legend>
                <form className="signup-form" onSubmit={signUpSubmit}>
                    <div>
                        아이디 <input type="text" name="username" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                        <button type="button" onClick={duplicateConfirm}>중복확인</button>
                        {duplicated && <span><small>중복확인 완료</small></span>}
                    </div>
                    비밀번호
                    <input type="password" name="password" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value}) // 이 부분이 action
                    }} required autoComplete="on"/>
                    비밀번호 확인
                    <input
                        type="password"
                        name="passwordConfirm"
                        onChange={(e) => {
                            dispatch({type: e.target.name, value: e.target.value})
                        }}
                        autoComplete="on"
                    />
                    성
                    <input type="text" name="korFirstName" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                    이름
                    <input type="text" name="korLastName" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                    영문 이름
                    <input type="text" name="engFirstName" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                    영문 성
                    <input type="text" name="engLastName" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                    성별을 선택하세요
                    <div>
                        MALE<input type="radio" name="gender" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.previousSibling.data})
                    }}/>
                        FEMALE<input type="radio" name="gender" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.previousSibling.data})
                    }}/>
                    </div>
                    생년월일 <input type="date" name="birthDay" onChange={(e) => {
                    dispatch({type: e.target.name, value: e.target.value})
                }} required/>
                    이메일 <input type="email" name="email" onChange={(e) => {
                    dispatch({type: e.target.name, value: e.target.value})
                }} required/>
                    <div>
                        휴대전화 국가
                        <br/>
                        <select name="phoneCountry" onChange={(e) => {
                            dispatch({type: e.target.name, value: e.target.value})
                        }}>
                            <option>====선택====</option>
                            {regionCountry && regionCountry.map((code) => {
                                return <option key={code.numCode}>{code.korName}</option>
                            })}
                        </select>
                    </div>
                    휴대전화 번호
                    <input type="tel" name="phone" onChange={(e) => {
                        dispatch({type: e.target.name, value: e.target.value})
                    }} required/>
                    <div>
                        국가
                        <br/>
                        <select name="country" onChange={(e) => {
                            dispatch({type: e.target.name, value: e.target.value})
                        }}>
                            <option>====선택====</option>
                            {regionCountry && regionCountry.map((code) => {
                                return <option key={code.numCode}>{code.korName}</option>
                            })}
                        </select>
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </SignUpSection>
        </SignUpContainer>
    );
}

export default SignUp;
