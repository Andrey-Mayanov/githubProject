import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { createOAuthAppAuth } from "@octokit/auth-oauth-app";
import { useLocation } from "react-router-dom";

const auth = createOAuthAppAuth({
  clientType: "oauth-app",
  clientId: process.env.REACT_APP_CLIENT_ID || "",
  clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
});

const gitHubAuthPost = async (code: string) => {
  const userAuthenticationFromWebFlow = await auth({
    type: "oauth-user",
    code,
  });
  console.log(userAuthenticationFromWebFlow);
  return userAuthenticationFromWebFlow;
};

const AuthorizationForm = () => {
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const [code, setCode] = useState<string | null>(null);
  const search = useLocation().search;

  useEffect(() => {
    const codeFromQueryString = new URLSearchParams(search).get("code");
    if (codeFromQueryString) {
      setCode(codeFromQueryString);
    }
  }, [search]);

  useEffect(() => {
    if (code) {
      gitHubAuthPost(code);
    }
  }, [code]);

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

export default AuthorizationForm;
