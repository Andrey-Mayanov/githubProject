import React from "react";
import styled from "styled-components";
import { routes } from "routes";
import { useRoutes } from "react-router-dom";

const Content = styled.div`
  padding: 1rem;
`;

function App() {
  let element = useRoutes(routes);

  return <Content>{element}</Content>;
}

export default App;
