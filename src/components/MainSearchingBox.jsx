import React from "react";
import styled from "styled-components";
const MainSearchingBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  top: 470px;
  position: absolute;
  left: 0;
  right: 0;
  .main-searching-box {
    width: 1200px;
    padding: 60px 30px 30px 30px;
    background: white
      url(//contents-image.twayair.com/homepage/images/main/bg_main_booking02.png)
      no-repeat 0 0;
    border-radius: 18px;
    box-sizing: border-box;
  }
`;

const FirstLineSection = styled.div`
  margin-bottom: 20px;
  select-type-section {
    vertical-align: top;
    min-width: 23%;
  }
  li {
    float: left;
  }
  .select-btn {
    vertical-align: center;
  }
  .first-select-bundle {
    display: inline-block;
  }
  .discount-code-input {
    border-radius: 20px;
    width: 190px;
    height: 36px;
    background-color: #f2f6f9;
    padding-left: 10px;
    border: 0;
  }
`;

const AreaInputWrap = styled.div`
  display: inline-block;
  position: relative;
  margin-left: ${({ margin }) => margin && `15px`};
  .input-btn {
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    outline: 0;
    width: 20px;
    height: 20px;
    background: ${({ bgurl }) =>
      bgurl
        ? `url(${bgurl}) no-repeat 50% 50%`
        : `url(//contents-image.twayair.com/homepage/images/ico/ico_btn_pin.png) no-repeat 50% 50%`};
  }
`;
const SecondLineSection = styled.div`
  .second-select-input {
    position: relative;
    width: 240px;
    height: 60px;
    border: 0;
    background-color: #f2f6f9;
  }
  .main-search-btn {
    margin-left: 15px;
    min-width: 100px;
    min-height: 60px;
    background-color: #7d756d;
    border: 1px solid #7d756d;
    border-radius: 3px;
  }
`;

function MainSearchingBox(props) {
  return (
    <MainSearchingBoxContainer>
      <div className="main-searching-box">
        <form>
          <FirstLineSection>
            <div className="select-type-section first-select-bundle">
              <div className="select-btn">
                <ul>
                  <li>왕복</li>
                  <li>편도</li>
                  <li>다구간</li>
                </ul>
              </div>
            </div>
            <div className="is-group first-select-bundle">
              <input type="checkbox" />
              <span>단체(10명이상)</span>
            </div>
            <div className="discount-code first-select-bundle">
              <input
                type="text"
                placeholder="할인코드 입력"
                className="discount-code-input"
              />
            </div>
          </FirstLineSection>
          <SecondLineSection>
            <AreaInputWrap>
              <input
                type="text"
                placeholder="출발지"
                className="second-select-input"
              />
              <button type="button" className="input-btn" />
            </AreaInputWrap>
            <AreaInputWrap margin="left">
              <input
                type="text"
                placeholder="도착지"
                className="second-select-input"
              />
              <button type="button" className="input-btn" />
            </AreaInputWrap>
            <AreaInputWrap
              margin="left"
              bgurl="//contents-image.twayair.com/homepage/images/ico/ico_btn_date.png"
            >
              <input
                type="text"
                placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                className="second-select-input"
              />
              <button type="button" className="input-btn" />
            </AreaInputWrap>
            <AreaInputWrap
              margin="left"
              bgurl="//contents-image.twayair.com/homepage/images/ico/ico_booking_passenger.png"
            >
              <input
                type="text"
                placeholder="성인 1, 소아0, 유아0"
                className="second-select-input"
              />
              <button type="button" className="input-btn" />
            </AreaInputWrap>
            <button type="submit" className="main-search-btn">
              조회
            </button>
          </SecondLineSection>
        </form>
      </div>
    </MainSearchingBoxContainer>
  );
}

export default MainSearchingBox;
