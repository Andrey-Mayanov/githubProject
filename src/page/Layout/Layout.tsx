import React from "react";
import styled from "styled-components";
import { Layout as AntLayout, PageHeader } from "antd";

const { Header, Content } = AntLayout;

type Props = {
  children: JSX.Element;
};

const StyledContent = styled(Content)`
  padding: 1rem;
`;

const StyledAntLayout = styled(AntLayout)`
  background: #fff;
`;

const StyledHeader = styled(Header)`
  background: #1890ff;
  color: #fff;
`;

const UserInfoDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const Layout = ({ children }: Props) => {
  return (
    <StyledAntLayout>
      <StyledHeader>
        <UserInfoDiv>{sessionStorage.getItem("userName")}</UserInfoDiv>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </StyledAntLayout>
  );
};

export default Layout;
