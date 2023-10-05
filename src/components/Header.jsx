import React, {useState} from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {SignInAtom} from "../recoil/SignInAtom";
import {PopupAtom} from "../recoil/PopupAtom";

function Header() {
    const location = useLocation();
    const userInfo = useRecoilValue(SignInAtom)
    const setUserPopup = useSetRecoilState(PopupAtom);
    return (
        <HeaderLayout className={location.pathname}>
            <Link to={"/"}>
                <span className="logo">D'way</span>
            </Link>
            <div className="header-reserv-menu">
                <ul>
                    <li>
                        <span>항공권 예매</span>
                    </li>
                    <li>
                        <span>나의 예약</span>
                    </li>
                    <li>
                        <span>이벤트</span>
                    </li>
                </ul>

            </div>
            <div className="my-header-menu">
                <ul>
                    <li> {
                        userInfo !== "" ?
                            <svg onClick={() =>
                                setUserPopup(true)
                            } xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-check" viewBox="0 0 16 16">
                                <path
                                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path
                                    d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg>
                            :
                            <Link to={"/signin"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-person" viewBox="0 0 16 16">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                </svg>
                                {/*로그인 여부*/}
                            </Link>}
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        {/*검색*/}
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                             className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        {/*메뉴*/}
                    </li>
                </ul>
            </div>
        </HeaderLayout>
    );
}

const HeaderLayout = styled.header`
  width: 100%;
  display: flex;
  padding: 10px;
  z-index: 20;
  @font-face {
    font-family: 'PartialSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  .bi {
    cursor: pointer;
    color: white;
    margin-left: 12px;
  }

  span {
    color: ${(props) => (props.className !== "/" ? "black" : "white")};
  }

  .logo {
    text-decoration: none;
    font-family: 'PartialSansKR-Regular';
    margin-top: 6px;
    font-size: 35px;
  }

  ul {
    display: flex;
    justify-content: space-between;
  }

  .header-reserv-menu {
    margin-left: 69px;
    margin-right: 69px;
    width: 820px;
  }

  .popup-container {
    background-color: white;
    position: relative;
    top: 100px;
    width: 560px;
    z-index: 200;
  }
`;

export default Header;
