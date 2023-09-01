import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const HeaderLayout = styled.header`
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

  span {
    color: ${(props) => (props.className !== "/" ? "black" : "white")};
  }
  .logo {
    margin-top: 15px;
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
    width: 820px;
  }
`;
function Header() {
  const location = useLocation();
  return (
    <HeaderLayout className={location.pathname}>
      <span className="logo">D'way</span>
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
