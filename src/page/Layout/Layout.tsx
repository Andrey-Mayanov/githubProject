import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Layout as AntLayout, Menu, Dropdown, Avatar } from "antd";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import useAuth from "hooks/useAuth";

const { Header, Content } = AntLayout;

const StyledContent = styled(Content)`
  padding: 1rem;
`;

const StyledAntLayout = styled(AntLayout)`
  background: #fff;
`;

const StyledHeader = styled(Header)`
  background: #1890ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderALink = styled.a`
  color: #fff;
  line-height: initial;
`;

const HeaderLink = styled(Link)`
  color: #fff;
  line-height: initial;
`;

const StyledAvatar = styled(Avatar)`
  margin-left: 5px;
`;

const menu = (setUser: Dispatch<SetStateAction<null>>) => (
  <Menu>
    <Menu.Item key="myRepo">
      <Link to="/my-repositories">Мои репозитории</Link>
    </Menu.Item>
    <Menu.Item key="logout" danger onClick={() => setUser(null)}>
      Выйти
    </Menu.Item>
  </Menu>
);

const Layout = () => {
  const { setUser, user } = useAuth();
  const { name = "", avatar_url = {} } = user || {};

  return (
    <StyledAntLayout>
      <StyledHeader>
        <HeaderLink to="/">
          <HomeOutlined />
        </HeaderLink>
        <div>
          <Dropdown overlay={menu(setUser)}>
            <HeaderALink onClick={(e) => e.preventDefault()}>
              {name} <DownOutlined />
            </HeaderALink>
          </Dropdown>
          <StyledAvatar src={avatar_url} />
        </div>
      </StyledHeader>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledAntLayout>
  );
};

export default Layout;
