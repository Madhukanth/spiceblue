import React from "react";
import styled from "styled-components";

import Tasks from "./features/tasks";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <MainContainer>
      <Tasks />
    </MainContainer>
  );
}

export default App;
