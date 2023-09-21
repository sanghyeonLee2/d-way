import axios from "axios";
import React, {useEffect, useState} from "react";
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

    useEffect( () => {
        const fetchRegion = async()=> {
            const result = await axios.get(
                `${API_KEY}/api/region/country`
            );
            setRegionCountry(result.data.countries)
            console.log(result.data)
        }
        fetchRegion();
    }, [API_KEY]);


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
    console.log(formState);
    const duplicateConfirm = async () => {
        const {username} = formState;
        try {
            const result = await axios.get(`${API_KEY}/api/auth/check-duplication`, {params: {username}});
            if ((result.status === 200) && (result.data.username === username)) {
                alert("아이디가 중복됩니다");
                return duplicated && setDuplicated(false);
            }
            if((result.status === 200) && (result.data.username !== username)) {
                alert("사용가능한 아이디 입니다");
                return setDuplicated(true);
            }
        } catch (err) {
            alert("에러가 발생 했습니다.")
            console.log(err)
        }
    }



    const formHandler = (e) => {
        if (e.target.value.endsWith(" ")) {
            alert("공백은 들어갈 수 없습니다.");
            e.target.value = ""
            return;
        }
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "gender" ? e.target.previousSibling.data : (e.target.name === "engFirstName") || (e.target.name === "engLastName") ?
                e.target.value.toUpperCase() : e.target.value
        }));
    };
 /*   const inputFormProxy = new Proxy(formState, {

        get(target, )
    })*/
    const countrySelectForm =(e) =>{
        const countryCode = regionCountry.find((country) => country.korName === e.target.value).code2
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: countryCode
        }));
    }
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
                        아이디 <input type="text" name="username" onChange={formHandler} required/>
                        <button type="button" onClick={duplicateConfirm}>중복확인</button>
                        {duplicated && <span><small>중복확인 완료</small></span>}
                    </div>
                    비밀번호
                    <input type="password" name="password" onChange={formHandler} required autoComplete="on"/>
                    비밀번호 확인
                    <input
                        type="password"
                        name="passwordConfirm"
                        onChange={formHandler}
                        autoComplete="on"
                    />
                    성
                    <input type="text" name="korFirstName" onChange={formHandler} required/>
                    이름
                    <input type="text" name="korLastName" onChange={formHandler} required/>
                    영문 이름
                    <input type="text" name="engFirstName" onChange={formHandler} required/>
                    영문 성
                    <input type="text" name="engLastName" onChange={formHandler} required/>
                    성별을 선택하세요
                    <div>
                        MALE<input type="radio" name="gender" onChange={formHandler}/>
                        FEMALE<input type="radio" name="gender" onChange={formHandler}/>
                    </div>
                    생년월일 <input type="date" name="birthDay" onChange={formHandler} required/>
                    이메일 <input type="email" name="email" onChange={formHandler} required/>
                    <div>
                        휴대전화 국가
                        <br/>
                        <select name="phoneCountry" onChange={countrySelectForm}>
                            <option>====선택====</option>
                            {regionCountry && regionCountry.map((code)=>{
                                return <option key={code.numCode}>{code.korName}</option>
                            })}
                        </select>
                    </div>
                    휴대전화 번호
                    <input type="tel" name="phone" onChange={formHandler} required/>
                    <div>
                        국가
                        <br/>
                        <select name="country" onChange={countrySelectForm}>
                            <option>====선택====</option>
                            {regionCountry && regionCountry.map((code)=>{
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
