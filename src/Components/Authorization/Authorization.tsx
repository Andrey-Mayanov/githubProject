import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Typography } from 'antd';
import styled from "styled-components";

const { Title } = Typography;

const AuthorizationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d9d9d9;
  padding: 1rem;
  border-radius: 1rem;
  background: #d9d9d9;
`;

const Authorization = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const { search } = useLocation();

  useEffect(() => {
    const codeFromQueryString = new URLSearchParams(search).get("code");
    if (codeFromQueryString) {
      const requestData = {
        code: codeFromQueryString,
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      };

      fetch(process.env.REACT_APP_PROXY_URL as string, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("userName", data.name);
          setToken(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search]);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <AuthorizationWrapper>
      <div>
        <Title level={3}>Вы не авторизованы</Title>
      </div>
      <div>
        <Title level={4}>Выберите способ авторизации:</Title>
      </div>
      <div>
        <Title level={5}>
          <a
            href={`https://github.com/login/oauth/authorize?scope=public_repo%20user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
            onClick={() => {
              setData({ ...data, errorMessage: "" });
            }}
          >
            <span>GitHub</span>
          </a>
        </Title>
      </div>
    </AuthorizationWrapper>
  );
};

export default Authorization;
