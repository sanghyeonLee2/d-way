import axios from "axios";
import React, {useEffect, useReducer, useRef, useState} from "react";
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
    const [regionCountry, setRegionCountry] = useState();
    const usernameRef = useRef();

    //const pattern = /\s/g; //공백 확인 정규표현식

    const reducer = (state, action) => {
        switch (action.type) {
            case "username":
            case "korFirstName":
            case "korLastName":
                return {
                    ...state, [action.type]: action.value
                }
            case "password":
            case "passwordConfirm":
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
            default:
                return;
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
    console.log(state);

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
            if ((result.status === 200 ) && result.data.duplicated) {
                console.log(result.data)
                alert("아이디가 중복됩니다.")
            }
            else{
                console.dir(usernameRef.current)
                usernameRef.current.disabled = true;
                alert("사용가능한 아이디 입니다.")
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
            if (result.status === 200) {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            }
        } catch (err) {
            alert("회원가입에 실패하였습니다.");
            console.log(err);
        }
    };
    return (
        <SignUpContainer>
            <SignUpSection>
                <legend><h1>회원가입</h1></legend>
                <form className="signup-form" onSubmit={signUpSubmit}>
                    <div>
                        아이디 <input type="text" onChange={(e) => {
                        dispatch({type: "username", value: e.target.value})
                    }} required ref={usernameRef}/>
                        <button type="button" onClick={duplicateConfirm}>중복확인</button>

                    </div>
                    비밀번호
                    <input type="password" onChange={(e) => {
                        dispatch({type: "password", value: e.target.value}) // 이 부분이 action
                    }} required autoComplete="on"/>
                    비밀번호 확인
                    <input
                        type="password"
                        onChange={(e) => {
                            dispatch({type: "passwordConfirm", value: e.target.value})
                        }}
                        autoComplete="on"
                    />
                    성
                    <input type="text" onChange={(e) => {
                        dispatch({type: "korFirstName", value: e.target.value})
                    }} required/>
                    이름
                    <input type="text" onChange={(e) => {
                        dispatch({type: "korLastName", value: e.target.value})
                    }} required/>
                    영문 이름
                    <input type="text" onChange={(e) => {
                        dispatch({type: "engFirstName", value: e.target.value})
                    }} required/>
                    영문 성
                    <input type="text" onChange={(e) => {
                        dispatch({type: "engLastName", value: e.target.value})
                    }} required/>
                    성별을 선택하세요
                    <div>
                        MALE<input type="radio" onChange={(e) => {
                        dispatch({type: "gender", value: e.target.previousSibling.data})
                    }}/>
                        FEMALE<input type="radio" onChange={(e) => {
                        dispatch({type: "gender", value: e.target.previousSibling.data})
                    }}/>
                    </div>
                    생년월일 <input type="date" onChange={(e) => {
                    dispatch({type: "birthDay", value: e.target.value})
                }} required/>
                    이메일 <input type="email" onChange={(e) => {
                    dispatch({type: "email", value: e.target.value})
                }} required/>
                    <div>
                        휴대전화 국가
                        <br/>
                        <select onChange={(e) => {
                            dispatch({type: "phoneCountry", value: e.target.value})
                        }}>
                            <option>====선택====</option>
                            {regionCountry && regionCountry.map((code) => {
                                return <option key={code.numCode}>{code.korName}</option>
                            })}
                        </select>
                    </div>
                    휴대전화 번호
                    <input type="tel" onChange={(e) => {
                        dispatch({type: "phone", value: e.target.value})
                    }} required/>
                    <div>
                        국가
                        <br/>
                        <select onChange={(e) => {
                            dispatch({type: "country", value: e.target.value})
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
