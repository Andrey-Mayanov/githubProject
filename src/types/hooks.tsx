import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export const PageInfoFieldsFragmentDoc = gql`
  fragment PageInfoFields on PageInfo {
    startCursor
    hasNextPage
    hasPreviousPage
    endCursor
  }
`;
export const RepositoryFieldsFragmentDoc = gql`
  fragment RepositoryFields on Repository {
    id
    name
    description
    stargazerCount
    viewerHasStarred
  }
`;
export const SearchRepositoriesDocument = gql`
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
  ${PageInfoFieldsFragmentDoc}
  ${RepositoryFieldsFragmentDoc}
`;

/**
 * __useSearchRepositoriesQuery__
 *
 * To run a query within a React component, call `useSearchRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRepositoriesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useSearchRepositoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.SearchRepositoriesQuery,
    Types.SearchRepositoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.SearchRepositoriesQuery,
    Types.SearchRepositoriesQueryVariables
  >(SearchRepositoriesDocument, options);
}
export function useSearchRepositoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SearchRepositoriesQuery,
    Types.SearchRepositoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.SearchRepositoriesQuery,
    Types.SearchRepositoriesQueryVariables
  >(SearchRepositoriesDocument, options);
}
export type SearchRepositoriesQueryHookResult = ReturnType<
  typeof useSearchRepositoriesQuery
>;
export type SearchRepositoriesLazyQueryHookResult = ReturnType<
  typeof useSearchRepositoriesLazyQuery
>;
export type SearchRepositoriesQueryResult = Apollo.QueryResult<
  Types.SearchRepositoriesQuery,
  Types.SearchRepositoriesQueryVariables
>;
export const AddStarDocument = gql`
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
export type AddStarMutationFn = Apollo.MutationFunction<
  Types.AddStarMutation,
  Types.AddStarMutationVariables
>;

/**
 * __useAddStarMutation__
 *
 * To run a mutation, you first call `useAddStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStarMutation, { data, loading, error }] = useAddStarMutation({
 *   variables: {
 *      starrableId: // value for 'starrableId'
 *   },
 * });
 */
export function useAddStarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AddStarMutation,
    Types.AddStarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AddStarMutation,
    Types.AddStarMutationVariables
  >(AddStarDocument, options);
}
export type AddStarMutationHookResult = ReturnType<typeof useAddStarMutation>;
export type AddStarMutationResult =
  Apollo.MutationResult<Types.AddStarMutation>;
export type AddStarMutationOptions = Apollo.BaseMutationOptions<
  Types.AddStarMutation,
  Types.AddStarMutationVariables
>;
export const RemoveStarDocument = gql`
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
export type RemoveStarMutationFn = Apollo.MutationFunction<
  Types.RemoveStarMutation,
  Types.RemoveStarMutationVariables
>;

/**
 * __useRemoveStarMutation__
 *
 * To run a mutation, you first call `useRemoveStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStarMutation, { data, loading, error }] = useRemoveStarMutation({
 *   variables: {
 *      starrableId: // value for 'starrableId'
 *   },
 * });
 */
export function useRemoveStarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RemoveStarMutation,
    Types.RemoveStarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RemoveStarMutation,
    Types.RemoveStarMutationVariables
  >(RemoveStarDocument, options);
}
export type RemoveStarMutationHookResult = ReturnType<
  typeof useRemoveStarMutation
>;
export type RemoveStarMutationResult =
  Apollo.MutationResult<Types.RemoveStarMutation>;
export type RemoveStarMutationOptions = Apollo.BaseMutationOptions<
  Types.RemoveStarMutation,
  Types.RemoveStarMutationVariables
>;
