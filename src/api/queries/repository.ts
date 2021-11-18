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
        hasPreviousPage
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          description
          stargazerCount
          viewerHasStarred
          owner {
            login
          }
        }
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation addStar($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation removeStar($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        id
        stargazerCount
        viewerHasStarred
      }
    }
  }
`;
