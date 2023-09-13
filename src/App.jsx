import { styled, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
body {
  height: 100%;
  margin: 0px;
  padding : 0px;
  display: flex;
  justify-content: center;
  min-width : 1200px;
}
input {
  height:46px;
}
ul{
  padding-inline-start: 0px;
}
li{list-style: none;}
`;
const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 740px;
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <OuterContainer>
        <Container>
          <Header />
          <Outlet />
          {/* 중첩된 자식 라우트가 렌더링되는 위치를 지정 */}
        </Container>
      </OuterContainer>
    </>
  );
}

export default App;
