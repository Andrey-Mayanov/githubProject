import React from "react";
import { Space } from "antd";
import styled from "styled-components";
import useAuth from "hooks/useAuth";
import RepositoriesContainer from "containers/RepositoriesContainer";

const StyledSpace = styled(Space)`
  width: 100%;
`;

const ToRightDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const ADDITIONAL_TO_REQUEST = "user:Andrey-Mayanov";

const MyRepositoriesContainer = () => {
  const { user } = useAuth();
  const { login = "" } = user || {};

  return (
    <StyledSpace direction="vertical">
      <RepositoriesContainer
        allowEmptyInput
        additionalToRequest={ADDITIONAL_TO_REQUEST}
      />
      <ToRightDiv>
        <a
          href={`https://github.com/${login}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          Посмотреть на GitHub
        </a>
      </ToRightDiv>
    </StyledSpace>
  );
};

export default MyRepositoriesContainer;
