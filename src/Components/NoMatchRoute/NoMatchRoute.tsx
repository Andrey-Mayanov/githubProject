import React from "react";
import { Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const NoMatchRoute = () => (
  <Wrapper>
    <Typography>
      <Title>
        Страница не найдена
        <FrownOutlined />
      </Title>
    </Typography>
  </Wrapper>
);

export default NoMatchRoute;
