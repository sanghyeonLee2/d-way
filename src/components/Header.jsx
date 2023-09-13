import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const HeaderLayout = styled.header`
  width: 100%;
  display: flex;
  padding: 10px;
  z-index: 20;
  @font-face {
    font-family: "Material Symbols Rounded";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialsymbolsrounded/v123/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOc7TOVpeRL2w5rwZu2rIelXxc.woff2)
      format("woff2");
  }

  @font-face {
    font-family: 'PartialSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2') format('woff2');
    font-weight: normal;
    
    font-style: normal;
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

  #material-symbols-rounded {
    font-family: "Material Symbols Rounded";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
  }
  ul {
    display: flex;
    justify-content: space-between;
  }
  .header-reserv-menu {
    margin-left: 69px;
    margin-right:69px;
    width: 820px;
  }
`;
function Header() {
  const location = useLocation();
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
          <li>
            <Link to={"/signin"}>
              <span id="material-symbols-rounded">person</span>
            </Link>
          </li>
          <li>
            <span>검색</span>
          </li>
          <li>
            <span>메뉴</span>
          </li>
        </ul>
      </div>
    </HeaderLayout>
  );
}

export default Header;
