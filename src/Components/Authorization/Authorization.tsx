import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const Authorization = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const search = useLocation().search;

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
          sessionStorage.setItem("token", data);
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
    <a
      className="login-link"
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
      onClick={() => {
        setData({ ...data, errorMessage: "" });
      }}
    >
      <span>Login with GitHub</span>
    </a>
  );
};

export default Authorization;
