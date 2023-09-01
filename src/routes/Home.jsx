import React from "react";
import { styled } from "styled-components";
import MainSearchingBox from "../components/MainSearchingBox";

const MainView = styled.div`
  background-image: url(https://contents-image.twayair.com/homepage/images/main/main_visual.png);
  margin-top: -85px;
  position: relative;
  #main_video {
    max-width: 1920px; //요소의 최대 넓이, width의 속성값을 무효화 가능
    height: 740px;
  }
  .video-section {
    position: relative;
  }
  .main-title {
    margin-top: 85px;
    width: 80%;
    position: absolute;
    display: flex;
    justify-content: center;
  }
  h1 {
    z-index: 19;
    color: white;
  }
`;

function Home(props) {
  return (
    <main>
      <MainView>
        <div className="main-title">
          <h1>이달의 특가</h1>
        </div>
        <div className="video-section">
          <video autoPlay id="main_video" muted width="2500">
            <source
              type="video/mp4"
              src="https://contents-image.twayair.com/contents/2023/0323/970456da-df2e-4105-a47f-a0ceb35b6470.mp4"
            ></source>
          </video>
        </div>
        <MainSearchingBox />
      </MainView>
    </main>
  );
}

export default Home;
