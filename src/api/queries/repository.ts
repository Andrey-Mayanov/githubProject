import { gql } from "@apollo/client";

export const GET_REPOSITORIES_BY_NAME = gql`
  query searchRepositories(
    $query: String!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    search(
      query: $query
      after: $after
      before: $before
      type: REPOSITORY
      first: $first
      last: $last
    ) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          description
          stargazerCount
        }
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation addStar($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        stargazers(first: 3) {
          nodes {
            name
          }
        }
      }
    }
  }
`;
