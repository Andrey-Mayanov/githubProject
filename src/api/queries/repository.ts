import { gql } from "@apollo/client";

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    startCursor
    hasNextPage
    hasPreviousPage
    endCursor
  }
`;

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    name
    description
    stargazerCount
    viewerHasStarred
  }
`;

export const GET_MY_REPOSITORIES = gql`
  ${PAGE_INFO_FIELDS}
  ${REPOSITORY_FIELDS}
  query getMyRepositories(
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    viewer {
      repositories(
        affiliations: [OWNER]
        after: $after
        before: $before
        first: $first
        last: $last
      ) {
        pageInfo {
          ...PageInfoFields
        }
        nodes {
          ...RepositoryFields
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_BY_NAME = gql`
  ${PAGE_INFO_FIELDS}
  ${REPOSITORY_FIELDS}
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
        ...PageInfoFields
      }
      nodes {
        ... on Repository {
          ...RepositoryFields
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
