import { ApolloLink } from "@apollo/client";

export const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  return forward(operation);
});
