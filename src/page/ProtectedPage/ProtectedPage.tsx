import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Navigate } from "react-router-dom";

const GITHUB_BASE_URL = "https://api.github.com/graphql";

type Props = {
  children: JSX.Element;
};

const ProtectedPage = ({ children }: Props) => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/auth" />;
  }

  const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ProtectedPage;
