import React from "react";
import RepositoriesContainer from "containers/RepositoriesContainer";
import styled from "styled-components";

const Content = styled.div`
  padding: 1rem;
`;

function App() {
  return (
    <Content>
      <RepositoriesContainer />
    </Content>
  );
}

export default App;
