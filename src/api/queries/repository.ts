import { gql } from "@apollo/client";

// или .graphql
export const GET_REPOSITORIES_BY_NAME = gql`
  query searchRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          description
        }
      }
    }
  }
`;
